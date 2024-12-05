// Imports
import { db } from '../../Server.js';
import SystemConfig from '../../types/SystemConfig.js';

/**
 * Async function to fetch the current card limit config from the DB
 * @param newLimit The new limit to set
 * @returns Flag to indicate success
 */
async function updateSetCreationLimitConfig(
	newLimit: number,
): Promise<SystemConfig | null> {
	try {
		const updatedConfig = await db.systemConfig.update({
			where: {
				configUUID: '7d6456e7-53f9-4d23-a547-a2590dd5bc30',
			},
			data: {
				setCreationLimit: newLimit,
			},
		});
		return updatedConfig;
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

export default updateSetCreationLimitConfig;
