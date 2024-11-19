// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import getUserCardAllocations from '../../queries/hidden-card-allocations/GetUserCardAllocations.js';
import { GETHiddenCardsUserUUIDParams } from '../../schemas/hidden-card-allocations/SchemaGETHiddenCardsUserUUID.js';

/**
 * Route to fetch all hidden card allocations for a given user
 */
const routeGETHiddenCardUserUUID = async (
	req: FastifyRequest<{ Params: GETHiddenCardsUserUUIDParams }>,
	rep: FastifyReply,
): Promise<void> => {
	const hiddenCards: string[] = await getUserCardAllocations(
		req.params.userUUID,
	);
	rep.status(200).send(hiddenCards as string[]);
	return;
};

export default routeGETHiddenCardUserUUID;
