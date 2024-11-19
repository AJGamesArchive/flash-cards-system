// Imports
import { db } from '../../Server.js';

/**
 * Async function to create a collection set allocation for a given collection
 * @param userUUID UUID of collection author
 * @param collectionUUID UUID of collection to add the set to
 * @param setUUID UUID of set to add to collection
 * @returns HTML status code - 201 SUccess - 403 User Not Owner - 404 Entity Not Found
 */
async function createCollectionSetAllocation(
	userUUID: string,
	collectionUUID: string,
	setUUID: string,
): Promise<number> {
	try {
		await db.$transaction(async (tx) => {
			// Ensure user owns the collection
			const collection = await tx.collections.findUnique({
				where: {
					collectionUUID: collectionUUID,
					authorUUID: userUUID,
				},
			});
			if (!collection) throw new Error('User does not own collection');
			return await tx.collectionAllocations.create({
				data: {
					collection: {
						connect: {
							collectionUUID: collectionUUID,
						},
					},
					set: {
						connect: {
							setUUID: setUUID,
						},
					},
				},
			});
		});
		return 201;
	} catch (error: any) {
		console.error(error);
		if (error.message === 'User does not own collection') return 403;
		return 404;
	}
}

export default createCollectionSetAllocation;
