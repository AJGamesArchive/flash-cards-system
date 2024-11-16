// Imports
import { db } from "../../Server.js";

/**
 * Async function to soft delete a user by toggling the 'delete' flag in the DB
 * @param userUUID UUID of user to soft delete
 */
async function softDeleteUser(userUUID: string): Promise<boolean> {
  try {
    await db.users.update({
      where: {
        userUUID: userUUID,
      },
      data: {
        deleted: true,
      },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  };
};

export default softDeleteUser;