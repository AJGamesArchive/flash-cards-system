// Imports
import * as bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidGen } from 'uuid';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import createUser from '../../queries/users/CreateUser.js';
import {
	POSTUsersRequest,
	POSTUsersReply201,
	POSTUsersReplyError,
} from '../../schemas/users/SchemaPOSTUsers.js';
import saltRound from '../../static/SaltRound.js';
import JWTData from '../../types/JWTData.js';
import { FullUser } from '../../types/User.js';

/**
 * Route to create a new user
 */
const routePOSTUsers = async (
	req: FastifyRequest<{ Body: POSTUsersRequest }>,
	rep: FastifyReply,
): Promise<void> => {
	// Create new user object
	const newUser: FullUser = {
		userUUID: uuidGen(),
		username: req.body.username,
		password: await bcrypt.hash(req.body.password, saltRound),
		adminFlag: req.body.adminFlag,
		userSince: new Date(),
		loginToken: null,
		deleted: false,
		apiAccount: req.body.apiAccount,
	};

	// If new account is an admin account, ensure it's being created by an existing Admin
	if (newUser.adminFlag) {
		const user: JWTData | null = await castJWTPayload(req);
		if (!user || !user.isAdmin) {
			rep.status(403).send({
				message: 'You cannot create an Admin account',
			} as POSTUsersReplyError);
			return;
		}
	}

	// Create the account
	const success: boolean = await createUser(newUser);
	if (!success) {
		rep.status(500).send({
			message: 'Failed to create user',
		} as POSTUsersReplyError);
		return;
	}

	// Return created user
	rep.status(201).send({
		userUUID: newUser.userUUID,
		username: newUser.username,
		adminFlag: newUser.adminFlag,
		userSince: newUser.userSince.toISOString(),
		deleted: newUser.deleted,
		apiAccount: newUser.apiAccount,
	} as POSTUsersReply201);
	return;
};

export default routePOSTUsers;
