// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import createUserCardAllocation from '../../queries/hidden-card-allocations/CreateUserCardAllocation.js';
import {
	POSTHiddenCardsUserUUIDParams,
	POSTHiddenCardsUserUUIDRequest,
	POSTHiddenCardsUserUUIDReply201,
	POSTHiddenCardsUserUUIDReplyError,
} from '../../schemas/hidden-card-allocations/SchemaPOSTHiddenCardsUserUUID.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to create a hidden card allocations for a given user
 */
const routePOSTHiddenCardUserUUID = async (
	req: FastifyRequest<{
		Params: POSTHiddenCardsUserUUIDParams;
		Body: POSTHiddenCardsUserUUIDRequest;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as POSTHiddenCardsUserUUIDReplyError);
		return;
	}

	// Ensure user is editing their own hidden card allocations
	if (user.uuid !== req.params.userUUID) {
		rep.status(403).send({
			message: 'Cannot edit hidden cards for other users.',
		} as POSTHiddenCardsUserUUIDReplyError);
		return;
	}

	// Create card allocation
	const success: boolean = await createUserCardAllocation(
		req.params.userUUID,
		req.body.cardUUID,
	);
	if (!success) {
		rep.status(404).send({
			message: 'User or Flashcard Not Found',
		} as POSTHiddenCardsUserUUIDReplyError);
		return;
	}

	// Return confirmation
	rep.status(201).send({
		userUUID: req.params.userUUID,
		cardUUID: req.body.cardUUID,
	} as POSTHiddenCardsUserUUIDReply201);
	return;
};

export default routePOSTHiddenCardUserUUID;
