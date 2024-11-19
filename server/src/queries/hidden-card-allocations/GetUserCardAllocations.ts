// Imports
import { db } from '../../Server.js';

/**
 * Async function to fetch all the hidden card allocations for a given user
 * @param userUUID UUID of user fetch allocations for
 * @returns String array of card UUIDs of cards hidden from users
 */
async function getUserCardAllocations(userUUID: string): Promise<string[]> {
	const hiddenCards = await db.hiddenCardAllocation.findMany({
		where: {
			userUUID: userUUID,
		},
	});
	return hiddenCards.map((card) => card.cardUUID) as string[];
}

export default getUserCardAllocations;
