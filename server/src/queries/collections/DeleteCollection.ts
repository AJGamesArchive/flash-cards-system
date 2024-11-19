// Imports
import { db } from '../../Server.js';

/**
 * Async function to delete a given collection from the DB
 * @param userUUID UUID of collection author
 * @param collectionUUID UUID of collection
 * @returns True if process was successful, otherwise false
 */
async function deleteCollection(
	userUUID: string,
	collectionUUID: string,
): Promise<boolean> {
	try {
		await db.collections.delete({
			where: {
				collectionUUID: collectionUUID,
				authorUUID: userUUID,
			},
		});
		return true;
	} catch (error: any) {
		console.error(error);
		return false;
	}
}

export default deleteCollection;
