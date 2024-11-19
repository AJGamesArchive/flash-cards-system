// Imports
import { db } from '../../Server.js';
import FlashcardUsageLog from '../../types/FlashcardUsageLog.js';

/**
 * Async function to add a flashcard usage log to the DB
 * @param newLog New Log Object
 * @returns True if process is successful, otherwise false
 */
async function addFlashcardUsageLog(
	newLog: FlashcardUsageLog,
): Promise<boolean> {
	try {
		await db.flashCardUsageLogs.create({
			data: {
				logUUID: newLog.logUUID,
				faceDownTime: newLog.faceDownTime,
				revisionTime: newLog.revisionTime,
				timesFlipped: newLog.timesFlipped,
				card: {
					connect: {
						cardUUID: newLog.cardUUID,
					},
				},
			},
		});
		return true;
	} catch (error: any) {
		console.error(error);
		return false;
	}
}

export default addFlashcardUsageLog;
