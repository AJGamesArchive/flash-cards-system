// Imports
import { db } from '../../Server.js';
import Flashcard from '../../types/Flashcard.js';
import FlashcardSet from '../../types/FlashcardSet.js';

/**
 * Async function to save flashcards to the database
 * @param set Flashcard Set Object
 * @param flashcards Array of Flashcards
 * @param newFlag Optional flag to indicate if set is new
 * @returns HTML status code - 200 Success, 500 Server Error, 404 Set Not FOund
 */
async function saveFlashcardSet(
	set: FlashcardSet,
	flashcards: Flashcard[],
	newFlag?: boolean,
): Promise<number> {
	// Generate DB update queries for each set amd flashcard
	let queries: any[] = [];
	if (newFlag) {
		// Create new set and new flashcards if new flag is present
		queries.push(
			db.sets.create({
				data: {
					setUUID: set.setUUID,
					name: set.name,
					description: set.description,
					createdAt: set.createdAt,
					updatedAt: set.updatedAt,
					author: {
						connect: {
							userUUID: set.authorUUID,
						},
					},
				},
			}),
		);
		flashcards.forEach((flashcard) =>
			queries.push(
				db.flashCards.create({
					data: {
						cardUUID: flashcard.cardUUID,
						question: flashcard.question,
						answer: flashcard.answer,
						createdAt: flashcard.createdAt,
						updatedAt: flashcard.updatedAt,
						set: {
							connect: {
								setUUID: flashcard.setUUID,
							},
						},
						difficulty: {
							connect: {
								difficultyUUID: String(flashcard.difficulty),
							},
						},
					},
				}),
			),
		);
	} else {
		// Update existing set and flashcards if no new flag is present
		queries.push(
			db.sets.update({
				where: {
					setUUID: set.setUUID,
				},
				data: {
					name: set.name,
					description: set.description,
					updatedAt: set.updatedAt,
				},
			}),
		);
		flashcards.forEach((flashcard) =>
			queries.push(
				db.flashCards.update({
					where: {
						cardUUID: flashcard.cardUUID,
					},
					data: {
						question: flashcard.question,
						answer: flashcard.answer,
						updatedAt: set.updatedAt,
						difficulty: {
							connect: {
								difficultyUUID: String(flashcard.difficulty),
							},
						},
					},
				}),
			),
		);
	}

	// Make all DB updates in transaction
	try {
		await db.$transaction(queries);
		return 200;
	} catch (error: any) {
		console.error(error);
		if (newFlag) return 500;
		return 404;
	}
}

export default saveFlashcardSet;
