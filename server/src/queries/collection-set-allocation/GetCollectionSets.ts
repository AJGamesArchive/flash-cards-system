// Imports
import { db } from '../../Server.js';
import { FullSet } from '../sets/GetSets.js';
import calculateAverageSetRating from '../../functions/sets/CalculateAverageSetRating.js';

/**
 * Async function to fetch all sets from with a given users collection
 * @param userUUID UUID of collection author
 * @param collectionUUID UUID of collection
 */
async function getCollectionSets(
	userUUID: string,
	collectionUUID: string,
): Promise<FullSet[] | null> {
	// Fetch all set details for all sets in a given users collection
	const setsQuery = await db.collections.findUnique({
		where: {
			authorUUID: userUUID,
			collectionUUID: collectionUUID,
		},
		select: {
			collectionAllocation: {
				select: {
					set: {
						include: {
							author: {
								select: {
									username: true,
								},
							},
							flashCards: {
								select: {
									cardUUID: true,
								},
							},
							setReview: {
								select: {
									starRating: true,
								},
							},
						},
					},
				},
			},
		},
	});

	// Ensure data was found
	if (!setsQuery) return null;

	// Return an array of FullSet objects for each set in the given collection
	return setsQuery.collectionAllocation.map(
		(allocation) =>
			({
				...allocation.set,
				authorUsername: allocation.set.author.username,
				numReviews: allocation.set.setReview.length,
				numFlashcards: allocation.set.flashCards.length,
				averageRating: calculateAverageSetRating(allocation.set.setReview.map((review) => review.starRating)),
			}) as FullSet,
	) as FullSet[];
}

export default getCollectionSets;
