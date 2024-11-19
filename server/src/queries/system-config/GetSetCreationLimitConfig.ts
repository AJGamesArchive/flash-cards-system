// Imports
import { db } from '../../Server.js';
import SystemConfig from '../../types/SystemConfig.js';

/**
 * Async function to fetch the current card limit config from the DB
 * @returns SystemCOnfig object
 */
async function getSetCreationLimitConfig(): Promise<SystemConfig | null> {
	const setLimitConfig = await db.systemConfig.findUnique({
		where: {
			configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30',
		},
	});
	if (!setLimitConfig) return null;
	return {
		configUUID: setLimitConfig.configUUID,
		setCreationLimit: setLimitConfig.setCreationLimit,
		creationCounter: setLimitConfig.creationCounter,
		currentDate: setLimitConfig.currentDate,
	} as SystemConfig;
}

export default getSetCreationLimitConfig;
