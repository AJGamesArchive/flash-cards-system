// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import getSets from '../../queries/sets/GetSets.js';
import { FullSet } from '../../queries/sets/GetSets.js';
import {
	UserUserUUIDSetsParams,
	UserUserUUIDSetsReply200,
	// UsersUserUUIDSetsReplyError,
} from '../../schemas/users/SchemaUsersUserUUIDSets.js';

//TODO Create a better way for this endpoint to detect if the user can't be found [404]

/**
 * Route to fetch all the sets created by a given user
 */
const routeUsersUserUUIDSets = async (
	req: FastifyRequest<{ Params: UserUserUUIDSetsParams }>,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch all sets gy a given user
	const sets: FullSet[] = await getSets(req.params.userUUID);
	// if (sets.length === 0) {
	// 	rep.status(404).send({
	// 		message: 'No sets could be found for the given user.',
	// 	} as UsersUserUUIDSetsReplyError);
	// 	return;
	// }

	// Return sets
	rep.status(200).send(
		sets.map(
			(fullSet) =>
				({
					...fullSet,
					createdAt: fullSet.createdAt.toISOString(),
					updatedAt: fullSet.updatedAt.toISOString(),
				}) as UserUserUUIDSetsReply200,
		) as UserUserUUIDSetsReply200[],
	);
	return;
};

export default routeUsersUserUUIDSets;
