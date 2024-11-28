// Imports
import { db } from '../../Server.js';
import calculateAverageSetRating from '../../functions/sets/CalculateAverageSetRating.js';

/**
 * Type to define set data returned from the DB
 */
export type FullSet = {
	setUUID: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	authorUUID: string;
	authorUsername: string;
	numReviews: number;
	numFlashcards: number;
	averageRating: number;
};

/**
 * Async function to retrieve a set and all it's totals from the database based on given params
 * @note Fetches all sets if no params are passed
 * @param authorUUID Optional - UUID of user to retrieve sets for
 * @param setUUID Optional - UUID of specific set to fetch
 * @note Set UUID overrides user UUID if both params are passed
 * @returns Set details and reviews
 */
async function getSets(
	authorUUID?: string,
	setUUID?: string,
): Promise<FullSet[]> {
	// Define variables to store base fetched data
	let setQuery;

	// Fetch data from DB
	if (authorUUID || setUUID) {
		if (setUUID) {
			// Fetch specific set
			setQuery = await db.sets.findMany({
				where: {
					setUUID: setUUID,
				},
				include: {
					author: {
						select: {
							username: true,
						},
					},
					setReview: {
						select: {
							starRating: true,
						},
					},
					flashCards: {
						select: {
							cardUUID: true,
						},
					},
				},
			});
		} else {
			// Fetch all sets authored by a given user
			setQuery = await db.sets.findMany({
				where: {
					authorUUID: authorUUID,
				},
				include: {
					author: {
						select: {
							username: true,
						},
					},
					setReview: {
						select: {
							starRating: true,
						},
					},
					flashCards: {
						select: {
							cardUUID: true,
						},
					},
				},
			});
		}
	} else {
		// Fetch all sets and all set reviews
		setQuery = await db.sets.findMany({
			include: {
				author: {
					select: {
						username: true,
					},
				},
				setReview: {
					select: {
						starRating: true,
					},
				},
				flashCards: {
					select: {
						cardUUID: true,
					},
				},
			},
		});
	}

	// Return mapped data
	return setQuery.map(
		(set) =>
			({
				setUUID: set.setUUID,
				name: set.name,
				description: set.description,
				createdAt: set.createdAt,
				updatedAt: set.updatedAt,
				authorUUID: set.authorUUID,
				authorUsername: set.author.username,
				numReviews: set.setReview.length,
				numFlashcards: set.flashCards.length,
				averageRating: calculateAverageSetRating(set.setReview.map((review) => review.starRating)),
			}) as FullSet,
	) as FullSet[];
}

export default getSets;
