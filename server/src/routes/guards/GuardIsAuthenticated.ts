// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import isUserTokenCurrent from '../../queries/auth/IsUserTokenCurrent.js';
import { AuthenticateReplyError } from '../../schemas/guards/SchemaIsAuthenticated.js';
import JWTData from '../../types/JWTData.js';

/**
 * Guard Route to authenticate a request by validating the JWT
 */
const guardAuthenticate = async <B, P, Q>(
	req: FastifyRequest<{ Body: B; Params: P; Querystring: Q }>,
	rep: FastifyReply,
): Promise<void> => {
	// Try to auth the JWT
	try {
		const userData: JWTData = await req.jwtVerify<JWTData>();
		const current: boolean = await isUserTokenCurrent(
			userData.uuid,
			req.headers.authorization,
		);
		if (!current) throw new Error('User Token Outdated');
	} catch (error: any) {
		console.warn(error);
		rep.status(401).send({
			message: 'You are not logged in.',
		} as AuthenticateReplyError);
	}
};

export default guardAuthenticate;
