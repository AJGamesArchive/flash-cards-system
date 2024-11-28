// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import getSets from '../../queries/sets/GetSets.js';
import { FullSet } from '../../queries/sets/GetSets.js';
import {
	UserUserUUIDSetsParams,
	UserUserUUIDSetsReply200,
	UsersUserUUIDSetsReplyError,
} from '../../schemas/users/SchemaUsersUserUUIDSets.js';

/**
 * Route to fetch all the sets created by a given user
 */
const routeUsersUserUUIDSets = async (
	req: FastifyRequest<{ Params: UserUserUUIDSetsParams }>,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch all sets gy a given user
	const sets: FullSet[] = await getSets(req.params.userUUID);
	if (sets.length === 0) {
		rep.status(404).send({
			message: 'No Sets Found',
		} as UsersUserUUIDSetsReplyError);
		return;
	}

	// Return sets
	rep.status(200).send(
		sets.map(
			(fullSet) =>
				({
					...fullSet,
					createdAt: fullSet.createdAt.toISOString(),
					updatedAt: fullSet.updatedAt.toISOString(),
				}) as UserUserUUIDSetsReply200,
		).sort((a, b) => b.averageRating - a.averageRating) as UserUserUUIDSetsReply200[],
	);
	return;
};

export default routeUsersUserUUIDSets;
