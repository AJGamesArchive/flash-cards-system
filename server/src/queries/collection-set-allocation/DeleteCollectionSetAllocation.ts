// Imports
import { db } from '../../Server.js';

/**
 * Async function to delete a collection set allocation from the DB
 * @param userUUID UUID of collection author
 * @param collectionUUID UUID of collection to remove set from
 * @param setUUID UUID of set to remove from collection
 * @returns HTML status code - 201 SUccess - 403 User Not Owner - 404 Entity Not Found
 */
async function deleteCollectionSetAllocation(
	userUUID: string,
	collectionUUID: string,
	setUUID: string,
): Promise<number> {
	try {
		await db.$transaction(async (tx) => {
			const collection = await tx.collections.findUnique({
				where: {
					collectionUUID: collectionUUID,
					author: {
						userUUID: userUUID,
					},
				},
			});
			if (!collection) throw new Error('User does not own collection');
			return await tx.collectionAllocations.delete({
				where: {
					setUUID_collectionUUID: {
						setUUID: setUUID,
						collectionUUID: collectionUUID,
					},
				},
			});
		});
		return 200;
	} catch (error: any) {
		console.error(error);
		if (error.message === 'User does not own collection') return 403;
		return 404;
	}
}

export default deleteCollectionSetAllocation;
