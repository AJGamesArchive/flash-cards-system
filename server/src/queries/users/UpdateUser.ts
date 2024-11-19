// Imports
import { db } from '../../Server.js';
import User from '../../types/User.js';

/**
 * Async function to update a users username and rank
 * @param userUUID UUID of user to update
 * @param username New username
 * @param adminFlag New rank
 * @returns True, is process was successful, otherwise false
 */
async function updateUser(
	userUUID: string,
	username: string,
	adminFlag: boolean,
): Promise<User | null> {
	try {
		const updatedUser = await db.users.update({
			where: {
				userUUID: userUUID,
			},
			data: {
				username: username,
				adminFlag: adminFlag,
				loginToken: null,
			},
		});
		return {
			userUUID: updatedUser.userUUID,
			username: updatedUser.username,
			adminFlag: updatedUser.adminFlag,
			userSince: updatedUser.userSince,
			deleted: updatedUser.deleted,
			apiAccount: updatedUser.apiAccount,
		} as User;
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

export default updateUser;
