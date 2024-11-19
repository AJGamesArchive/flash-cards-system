// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import createCollectionSetAllocation from '../../queries/collection-set-allocation/CreateCollectionSetAllocation.js';
import {
	POSTUserCollectionSetAllocationsParams,
	POSTUserCollectionSetAllocationsRequest,
	POSTUserCollectionSetAllocationsReply201,
	POSTUserCollectionSetAllocationsReplyError,
} from '../../schemas/collection-set-allocation/SchemaPOSTUserCollectionSetAllocations.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to add a set to a given users collection
 */
const routePOSTUserCollectionSetAllocations = async (
	req: FastifyRequest<{
		Params: POSTUserCollectionSetAllocationsParams;
		Body: POSTUserCollectionSetAllocationsRequest;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as POSTUserCollectionSetAllocationsReplyError);
		return;
	}

	// Ensure collection set allocations can only be made by the collection owner
	if (req.params.userUUID !== user.uuid) {
		rep.status(403).send({
			message: 'Cannot create collection set allocations for other users',
		} as POSTUserCollectionSetAllocationsReplyError);
		return;
	}

	// Create collection set allocation
	const creationStatus: number = await createCollectionSetAllocation(
		req.params.userUUID,
		req.params.collectionUUID,
		req.body.setUUID,
	);
	if (creationStatus !== 201) {
		rep.status(creationStatus).send({
			message:
				creationStatus === 403
					? 'User Not Collection Owner'
					: 'Entity Not Found',
		} as POSTUserCollectionSetAllocationsReplyError);
		return;
	}

	// Return creation confirmation
	rep.status(201).send({
		collectionUUID: req.params.collectionUUID,
		setUUID: req.body.setUUID,
	} as POSTUserCollectionSetAllocationsReply201);
	return;
};

export default routePOSTUserCollectionSetAllocations;
