// Imports
import * as bcrypt from 'bcrypt';

import { db } from '../../Server.js';
import saltRound from '../../static/SaltRound.js';

/**
 * Async function to validate and update a users password
 * @param userUUID UUID of user to update
 * @param oldPassword Users old password
 * @param newPassword Users new password
 * @returns HTML status code - 200 Password Updated, 401 Invalid Old Password, 404 User Not Found
 */
async function updatePassword(
	userUUID: string,
	oldPassword: string,
	newPassword: string,
): Promise<number> {
	// Fetch users old password
	const user = await db.users.findUnique({
		where: {
			userUUID: userUUID,
		},
		select: {
			password: true,
		},
	});
	if (!user) return 404;

	// Validate that old password is correct
	const match: boolean = await bcrypt.compare(oldPassword, user.password);
	if (!match) return 401;

	// Update users password in DB
	const hashedPassword: string = await bcrypt.hash(newPassword, saltRound);
	try {
		await db.users.update({
			where: {
				userUUID: userUUID,
			},
			data: {
				password: hashedPassword,
			},
		});
		return 200;
	} catch (error: any) {
		console.error(error);
		return 404;
	}
}

export default updatePassword;
