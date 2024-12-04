// Imports
import getSetCreationLimitConfig from '../../queries/system-config/GetSetCreationLimitConfig.js';
import { db } from '../../Server.js';
import JWTData from '../../types/JWTData.js';
import SystemConfig from '../../types/SystemConfig.js';
import getDateString from '../utilities/Timestamp.js';

/**
 * Async function to fetch the set creation limit config and allow or reject new set creations
 * @param userDate Current use date from JWT
 * @param rep Fastify Reply object
 * @returns True if creation is permitted, otherwise false
 */
async function allowSetCreation(userDate: JWTData): Promise<number> {
	// Permit set creation is user is an admin
	if (userDate.isAdmin) return 200;

	// Fetch card limit config data
	const setLimitConfig: SystemConfig | null = await getSetCreationLimitConfig();
	if (!setLimitConfig) return 404;

	// Create current date object
	const today = new Date();

	// Check if the creation counter has been reached - return 429 if limit reached otherwise return 200
	if (getDateString(setLimitConfig.currentDate) === getDateString(today)) {
		if (
			setLimitConfig.creationCounter >= setLimitConfig.setCreationLimit
		) return 429;
		else return 200;
	}

	// Reset the creation counter for the new day
	try {
		await db.systemConfig.update({
			where: {
				configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30',
			},
			data: {
				creationCounter: 0,
				currentDate: today,
			},
		});
	} catch (error: any) {
		console.error(error);
		return 500;
	}

	// Return true all if checks pass and set creation is permitted
	return 200;
}

export default allowSetCreation;
