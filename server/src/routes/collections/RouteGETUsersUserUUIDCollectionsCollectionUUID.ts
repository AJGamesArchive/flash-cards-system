// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import getCollections, {
	FullCollection,
} from '../../queries/collections/GetCollections.js';
import {
	GETUsersUserUUIDCollectionsCollectionUUIDParams,
	GETUsersUserUUIDCollectionsCollectionUUIDReply200,
	GETUsersUserUUIDCollectionsCollectionUUIDReplyError,
} from '../../schemas/collections/SchemaGETUsersUserUUIDCollectionsCollectionUUID.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to fetch a specific collection by UUID
 */
const routeGETUsersUserUUIDCollectionsCollectionUUID = async (
	req: FastifyRequest<{
		Params: GETUsersUserUUIDCollectionsCollectionUUIDParams;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as GETUsersUserUUIDCollectionsCollectionUUIDReplyError);
		return;
	}

	// Ensure collections can only be fetched by their owner or an Admin
	if (req.params.userUUID !== user.uuid && !user.isAdmin) {
		rep.status(403).send({
			message: 'Cannot fetch other users collections',
		} as GETUsersUserUUIDCollectionsCollectionUUIDReplyError);
		return;
	}

	// Fetch users collections
	const collections: FullCollection[] = await getCollections(
		req.params.userUUID,
		req.params.collectionUUID,
	);
	if (collections.length !== 1) {
		rep.status(404).send({
			message: 'Collection Not Found',
		} as GETUsersUserUUIDCollectionsCollectionUUIDReplyError);
		return;
	}

	// Send back collection
	rep.status(200).send({
		...collections[0],
		createdAt: collections[0].createdOn.toISOString(),
		updatedAt: collections[0].updatedOn.toISOString(),
	} as GETUsersUserUUIDCollectionsCollectionUUIDReply200);
	return;
};

export default routeGETUsersUserUUIDCollectionsCollectionUUID;
