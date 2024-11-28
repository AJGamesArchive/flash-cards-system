// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import deleteUserCardAllocation from '../../queries/hidden-card-allocations/DeleteUserCardAllocation.js';
import {
	DELETEHiddenCardsUserUUIDParams,
	DELETEHiddenCardsUserUUIDReplyError,
} from '../../schemas/hidden-card-allocations/SchemaDELETEHiddenCardsUserUUID.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to delete a hidden card allocations for a given user
 */
const routeDELETEHiddenCardUserUUID = async (
	req: FastifyRequest<{
		Params: DELETEHiddenCardsUserUUIDParams;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as DELETEHiddenCardsUserUUIDReplyError);
		return;
	}

	// Ensure user is editing their own hidden card allocations
	if (user.uuid !== req.params.userUUID) {
		rep.status(403).send({
			message: 'Cannot edit hidden cards for other users.',
		} as DELETEHiddenCardsUserUUIDReplyError);
		return;
	}

	// Delete card allocation
	const success: boolean = await deleteUserCardAllocation(
		req.params.userUUID,
		req.params.cardUUID,
	);
	if (!success) {
		rep.status(404).send({
			message: 'User or Flashcard Not Found',
		} as DELETEHiddenCardsUserUUIDReplyError);
		return;
	}

	// Return confirmation
	rep.status(204).send();
	return;
};

export default routeDELETEHiddenCardUserUUID;
