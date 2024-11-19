// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import castJWTPayload from '../../functions/utilities/CastJWTPayload.js';
import deleteSet from '../../queries/sets/DeleteSet.js';
import getSets from '../../queries/sets/GetSets.js';
import { FullSet } from '../../queries/sets/GetSets.js';
import {
	DELETESetsSetUUIDParams,
	DELETESetsSetUUIDReplyError,
} from '../../schemas/sets/SchemaDELETESetsSetUUID.js';
import JWTData from '../../types/JWTData.js';

/**
 * @protected
 * Route to delete a flashcard set and it's flashcards
 */
const routeDELETESetsSetUUID = async (
	req: FastifyRequest<{ Params: DELETESetsSetUUIDParams }>,
	rep: FastifyReply,
): Promise<void> => {
	// Map JWT data
	const user: JWTData | null = await castJWTPayload(req);
	if (!user) {
		rep.status(500).send({
			message: 'Something went wrong, please try again.',
		} as DELETESetsSetUUIDReplyError);
		return;
	}

	// Fetch required data from DB
	const existingSet: FullSet[] = await getSets(undefined, req.params.setUUID);
	if (existingSet.length !== 1) {
		rep.status(404).send({
			message: 'Set Not Found',
		} as DELETESetsSetUUIDReplyError);
		return;
	}

	// Ensure the set being updated belongs to the user updating it
	if (existingSet[0].authorUUID !== user.uuid) {
		rep.status(403).send({
			message: 'Set does not belong to you.',
		} as DELETESetsSetUUIDReplyError);
		return;
	}

	// Delete the set and it's flashcards
	const deleteStatus: number = await deleteSet(req.params.setUUID);
	if (deleteStatus !== 204) {
		rep.status(404).send({
			message: 'Set Not Found',
		} as DELETESetsSetUUIDReplyError);
		return;
	}

	// Return confirmation
	rep.status(204).send();
	return;
};

export default routeDELETESetsSetUUID;
