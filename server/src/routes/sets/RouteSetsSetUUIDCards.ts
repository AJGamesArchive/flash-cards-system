// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import shuffleArray from '../../functions/utilities/ShuffleArray.js';
import getFlashcards from '../../queries/sets/GetFlashcards.js';
import {
	SetsSetUUIDCardsParams,
	SetsSetUUIDCardsQuery,
	SetsSetUUIDCardsReply200,
	SetsSetUUIDCardsReplyError,
} from '../../schemas/sets/SchemaSetsSetUUIDCards.js';
import Flashcard from '../../types/Flashcard.js';

/**
 * Route to fetch all flashcards for a given set
 */
const routeSetsSetUUIDCards = async (
	req: FastifyRequest<{
		Params: SetsSetUUIDCardsParams;
		Querystring: SetsSetUUIDCardsQuery;
	}>,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch flashcards for a given set
	let flashcards: Flashcard[] = await getFlashcards(req.params.setUUID);
	if (flashcards.length === 0) {
		rep.status(404).send({
			message: 'Set Not Found',
		} as SetsSetUUIDCardsReplyError);
		return;
	}

	// Shuffle flashcard order if query is present
	if (req.query.shuffle) flashcards = shuffleArray(flashcards);

	// Return flashcards
	rep.status(200).send(
		flashcards.map(
			(card) =>
				({
					...card,
					createdAt: card.createdAt.toISOString(),
					updateAt: card.updatedAt.toISOString(),
				}) as SetsSetUUIDCardsReply200,
		) as SetsSetUUIDCardsReply200[],
	);
	return;
};

export default routeSetsSetUUIDCards;
