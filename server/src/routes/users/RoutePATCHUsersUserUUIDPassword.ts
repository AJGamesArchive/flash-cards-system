// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import updatePassword from '../../queries/users/UpdatePassword.js';
import {
	PATCHUsersUserUUIDPasswordParams,
	PATCHUsersUserUUIDPasswordRequest,
	PATCHUsersUserUUIDPasswordReplyError,
} from '../../schemas/users/SchemaPATCHUsersUserUUIDPassword.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to update a users password
 */
const routePATCHUsersUserUUIDPassword = async (
	req: FastifyRequest<{
		Params: PATCHUsersUserUUIDPasswordParams;
		Body: PATCHUsersUserUUIDPasswordRequest;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as PATCHUsersUserUUIDPasswordReplyError);
		return;
	}

	// Ensure you can only update your own password
	if (req.params.userUUID !== user.uuid) {
		rep.status(403).send({
			message: 'Cannot update passwords for other users',
		} as PATCHUsersUserUUIDPasswordReplyError);
		return;
	}

	// Update password if old password is correct
	const updateStatus: number = await updatePassword(
		req.params.userUUID,
		req.body.oldPassword,
		req.body.newPassword,
	);
	if (updateStatus !== 200) {
		rep.status(updateStatus).send({
			message:
				updateStatus === 401 ? 'Old Password Incorrect' : 'User Not Found',
		} as PATCHUsersUserUUIDPasswordReplyError);
		return;
	}

	// Return confirmation
	rep.status(204).send({});
	return;
};

export default routePATCHUsersUserUUIDPassword;
