// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidGen } from 'uuid';

import addFlashcardUsageLog from '../../queries/flashcard-logs/AddFlashcardUsageLog.js';
import {
	POSTFlashcardCardUUIDLogParams,
	POSTFlashcardCardUUIDLogRequest,
	POSTFlashcardCardUUIDLogReply201,
	POSTFlashcardLCardUUIDogReplyError,
} from '../../schemas/flashcard-logs/SchemaPOSTFlashcardCardUUIDLog.js';
import FlashcardUsageLog from '../../types/FlashcardUsageLog.js';

/**
 * @protected
 * Route to create a flashcard usage log
 */
const routePOSTFlashcardsCardUUIDlog = async (
	req: FastifyRequest<{
		Params: POSTFlashcardCardUUIDLogParams;
		Body: POSTFlashcardCardUUIDLogRequest;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Create log object
	const newLog: FlashcardUsageLog = {
		logUUID: uuidGen(),
		faceDownTime: req.body.faceDownTime,
		revisionTime: req.body.revisionTime,
		timesFlipped: req.body.timesFlipped,
		cardUUID: req.params.cardUUID,
	};

	// Add log to DB
	const success: boolean = await addFlashcardUsageLog(newLog);
	if (!success) {
		rep.status(404).send({
			message: 'Flashcard Not Found',
		} as POSTFlashcardLCardUUIDogReplyError);
		return;
	}

	// Return created log
	rep.status(201).send(newLog as POSTFlashcardCardUUIDLogReply201);
	return;
};

export default routePOSTFlashcardsCardUUIDlog;
