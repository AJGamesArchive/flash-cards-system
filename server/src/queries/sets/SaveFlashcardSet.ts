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
	adminFlag?: boolean,
): Promise<number> {
	// Generate DB update queries for each set amd flashcard
	let queries: any[] = [];
	if (newFlag) { //TODO FIX THIS FUCKERY!!!
		// Increment set creation counter if user is not admin
		if(!adminFlag) {
			const config = await db.systemConfig.findUnique({
				where: {
					configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30',
				},
				select: {
					creationCounter: true,
					setCreationLimit: true,
				},
			});
			if(config) {
				console.log(config, config.creationCounter + 1);
				// queries.push(
					db.systemConfig.update({
						where: {
							configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30',
						},
						data: {
							creationCounter: config.creationCounter + 1,
						},
					})
				// );
			} else {
				console.warn('WARNING: Failed to increment creation counter. Failed to fetch creation config.');
			};
		};

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
		flashcards.forEach((flashcard) => {
			// Add difficulty foreign key if present, otherwise nullify it
			if(flashcard.difficulty) {
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
				);
			} else {
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
						},
					}),
				);
			}
			return;
		});
	} else {
		// Split flashcards into two arrays - 1 new flashcards, 1 existing flashcards
		const newFlashcards: Flashcard[] = flashcards.filter((card) => !card.setUUID);
		const updatedFlashcards: Flashcard[] = flashcards.filter((card) => card.setUUID);

		// Fetch all flashcards current saved to the set
		const existingFlashcards = await db.flashCards.findMany({
			where: {
				setUUID: set.setUUID,
			},
			select: {
				cardUUID: true,
			},
		});

		// Update existing set
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

		// Update existing flashcards
		updatedFlashcards.forEach((flashcard) => {
			console.log('UPDATE') //! Remove later
			// Add difficulty foreign key if present, otherwise nullify it
			if(flashcard.difficulty) {
				console.log('DIFFICULTY', flashcard.difficulty) //! Remove later
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
				);
			} else {
				queries.push(
					db.flashCards.update({
						where: {
							cardUUID: flashcard.cardUUID,
						},
						data: {
							question: flashcard.question,
							answer: flashcard.answer,
							updatedAt: set.updatedAt,
							difficultyUUID: null,
						},
					}),
				);
			};
			return;
		});

		// Create new flashcards
		newFlashcards.forEach((flashcard) => {
			// Add difficulty foreign key if present, otherwise nullify it
			if(flashcard.difficulty) {
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
									setUUID: set.setUUID,
								},
							},
							difficulty: {
								connect: {
									difficultyUUID: String(flashcard.difficulty),
								},
							},
						},
					}),
				);
			} else {
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
									setUUID: set.setUUID,
								},
							},
						},
					}),
				);
			};
			return;
		});

		// Delete any flashcards that have been removed from the set
		existingFlashcards.forEach((flashcard) => {
			const present: boolean = updatedFlashcards.some((card) => card.cardUUID === flashcard.cardUUID);
			if(present) return;
			queries.push(
				db.flashCards.delete({
					where: {
						cardUUID: flashcard.cardUUID,
					},
				}),
			);
			return;
		});
	}

	// Make all DB updates in transaction
	try {
		await db.$transaction(queries, { isolationLevel: 'Serializable' });
		return 200;
	} catch (error: any) {
		console.error(error);
		if (newFlag) return 500;
		return 404;
	}
}

export default saveFlashcardSet;
