// Imports
import { db } from '../../Server.js';

/**
 * Type to define the collection data returned from the DB
 */
export type FullCollection = {
	collectionUUID: string;
	name: string;
	description: string;
	createdOn: Date;
	updatedOn: Date;
	authorUUID: string;
	numSets: number;
};

/**
 * Async function to fetch collections from the database
 * @param userUUID Optional - Fetch all collections for a given user
 * @param collectionUUID Optional - Fetch a specific collection based on UUID
 * @note Defaults to fetching all collections if no params are passed
 * @returns Array of collection data
 */
async function getCollections(
	userUUID?: string,
	collectionUUID?: string,
): Promise<FullCollection[]> {
	let collectionQuery;
	if (userUUID || collectionUUID) {
		if (collectionUUID) {
			collectionQuery = await db.collections.findMany({
				where: {
					collectionUUID: collectionUUID,
					authorUUID: userUUID || 'No UUID Passed',
				},
				include: {
					collectionAllocation: true,
				},
			});
		} else {
			collectionQuery = await db.collections.findMany({
				where: {
					authorUUID: userUUID,
				},
				include: {
					collectionAllocation: true,
				},
			});
		}
	} else {
		collectionQuery = await db.collections.findMany({
			include: {
				collectionAllocation: true,
			},
		});
	}
	return collectionQuery.map(
		(collection) =>
			({
				...collection,
				numSets: collection.collectionAllocation.length,
			}) as FullCollection,
	) as FullCollection[];
}

export default getCollections;
