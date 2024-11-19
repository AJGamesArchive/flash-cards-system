// Imports
import { db } from '../../Server.js';
import Flashcard from '../../types/Flashcard.js';

/**
 * Async function to fetch all the flashcards in a given set from the database
 * @param setUUID UUID of set to fetch flashcards for
 */
async function getFlashcards(setUUID: string): Promise<Flashcard[]> {
	const flashcards = await db.flashCards.findMany({
		where: {
			setUUID: setUUID,
		},
		include: {
			difficulty: {
				select: {
					value: true,
				},
			},
		},
	});
	return flashcards.map(
		(card) =>
			({
				cardUUID: card.cardUUID,
				question: card.question,
				answer: card.answer,
				difficulty: card.difficulty?.value || null,
				createdAt: card.createdAt,
				updatedAt: card.updatedAt,
				setUUID: setUUID,
			}) as Flashcard,
	) as Flashcard[];
}

export default getFlashcards;
