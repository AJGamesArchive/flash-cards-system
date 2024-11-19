// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import updateUser from '../../queries/users/UpdateUser.js';
import {
	PATCHUsersUserUUIDParams,
	PATCHUsersUserUUIDRequest,
	PATCHUsersUserUUIDReply200,
	PATCHUsersUserUUIDReplyError,
} from '../../schemas/users/SchemaPATCHUsersUserUUID.js';
import JWTData from '../../types/JWTData.js';
import User from '../../types/User.js';

/**
 * @protected
 * Route to update a users username and rank
 */
const routePATCHUsersUserUUID = async (
	req: FastifyRequest<{
		Params: PATCHUsersUserUUIDParams;
		Body: PATCHUsersUserUUIDRequest;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as PATCHUsersUserUUIDReplyError);
		return;
	}

	// Ensure that user rank can only be edited by admin users
	if (req.body.adminFlag) {
		if (!user.isAdmin) {
			rep.status(403).send({
				message: 'Cannot change user rank',
			} as PATCHUsersUserUUIDReplyError);
			return;
		}
	}

	// Ensure users are only updated by their owner or an admin
	if (req.params.userUUID !== user.uuid && !user.isAdmin) {
		rep.status(403).send({
			message: 'Cannot update other users',
		} as PATCHUsersUserUUIDReplyError);
		return;
	}

	// Update user
	const updatedUser: User | null = await updateUser(
		req.params.userUUID,
		req.body.username,
		req.body.adminFlag,
	);
	if (!updatedUser) {
		rep.status(404).send({
			message: 'User Not Found',
		} as PATCHUsersUserUUIDReplyError);
		return;
	}

	// Return updated user
	rep.status(200).send({
		...updatedUser,
		userSince: updatedUser.userSince.toISOString(),
	} as PATCHUsersUserUUIDReply200);
	return;
};

export default routePATCHUsersUserUUID;
