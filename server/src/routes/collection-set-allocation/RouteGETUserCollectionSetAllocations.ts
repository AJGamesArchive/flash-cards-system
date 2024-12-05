// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import getCollectionSets from '../../queries/collection-set-allocation/GetCollectionSets.js';
import { FullSet } from '../../queries/sets/GetSets.js';
import {
	GETUserCollectionSetAllocationsParams,
	GETUserCollectionSetAllocationsReply200,
	GETUserCollectionSetAllocationsReplyError,
} from '../../schemas/collection-set-allocation/SchemaGETUserCollectionSetAllocations.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to fetch all sets in a given collection
 */
const routeGETUserCollectionSetAllocations = async (
	req: FastifyRequest<{
		Params: GETUserCollectionSetAllocationsParams;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as GETUserCollectionSetAllocationsReplyError);
		return;
	}

	// Ensure collections can only be fetched by their owner or an Admin
	if (req.params.userUUID !== user.uuid && !user.isAdmin) {
		rep.status(403).send({
			message: 'Cannot fetch other users collections',
		} as GETUserCollectionSetAllocationsReplyError);
		return;
	}

	// Fetch all sets from the given collection
	const sets: FullSet[] | null = await getCollectionSets(
		req.params.userUUID,
		req.params.collectionUUID,
	);
	if (!sets) {
		rep.status(404).send({
			message: 'No collection found',
		} as GETUserCollectionSetAllocationsReplyError);
		return;
	}

	// Return sets
	rep.status(200).send(
		sets
			.map(
				(set) =>
					({
						...set,
						createdAt: set.createdAt.toISOString(),
						updatedAt: set.updatedAt.toISOString(),
					}) as GETUserCollectionSetAllocationsReply200,
			)
			.sort(
				(a, b) => b.averageRating - a.averageRating,
			) as GETUserCollectionSetAllocationsReply200[],
	);
	return;
};

export default routeGETUserCollectionSetAllocations;
