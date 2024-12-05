// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import deleteCollectionSetAllocation from '../../queries/collection-set-allocation/DeleteCollectionSetAllocation.js';
import {
	DELETEUserCollectionSetAllocationsParams,
	DELETEUserCollectionSetAllocationsReplyError,
} from '../../schemas/collection-set-allocation/SchemaDELETEUserCollectionSetAllocations.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to remove a set from a given users collection
 */
const routeDELETEUserCollectionSetAllocations = async (
	req: FastifyRequest<{
		Params: DELETEUserCollectionSetAllocationsParams;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as DELETEUserCollectionSetAllocationsReplyError);
		return;
	}

	// Ensure collection set allocations can only be deleted by the collection owner
	if (req.params.userUUID !== user.uuid) {
		rep.status(403).send({
			message: 'Cannot create collection set allocations for other users',
		} as DELETEUserCollectionSetAllocationsReplyError);
		return;
	}

	// Delete allocation
	const deleteStatus: number = await deleteCollectionSetAllocation(
		req.params.userUUID,
		req.params.collectionUUID,
		req.params.setUUID,
	);
	if (deleteStatus !== 200) {
		rep.status(deleteStatus).send({
			message:
				deleteStatus === 403 ? 'User Not Collection Owner' : 'Entity Not Found',
		} as DELETEUserCollectionSetAllocationsReplyError);
		return;
	}

	// Return confirmation
	rep.status(204).send();
	return;
};

export default routeDELETEUserCollectionSetAllocations;
