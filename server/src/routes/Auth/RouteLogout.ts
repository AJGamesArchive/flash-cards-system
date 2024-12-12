// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import setUserToken from '../../queries/auth/SetUserToken.js';
import { LogoutReply } from '../../schemas/Auth/SchemaLogout.js';
import JWTData from '../../types/JWTData.js';

/**
 * @Protected
 * Route to logout a user by removing their JWT from the DB
 */
const routeLogout = async (
	req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	// Send confirmation
	rep.status(202).send({
		message: 'Logging Out',
	} as LogoutReply);

	// Try to logout user
	const userData: JWTData | null = await castJWTPayload(req);
	if (!userData) return;
	await setUserToken(userData.uuid, null);
	return;
};

export default routeLogout;
