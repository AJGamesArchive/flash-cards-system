// Imports
import { db } from '../../Server.js';

/**
 * Async function to delete a flashcard set from the database
 * @param setUUID UUID of set to delete
 * @returns HTML status code - 204 Set Deleted, 404 Set Not Found
 */
async function deleteSet(setUUID: string): Promise<number> {
	try {
		await db.$transaction([
			db.sets.delete({
				where: {
					setUUID: setUUID,
				},
			}),
		]);
		return 204;
	} catch (error: any) {
		console.error(error);
		return 404;
	}
}

export default deleteSet;
