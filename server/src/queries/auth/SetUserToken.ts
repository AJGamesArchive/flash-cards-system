// Imports
import { db } from "../../Server.js";

/**
 * Async function to update a users token in the DB
 * @param userUUID UUID of user to save token to
 * @param token Token value to save
 * @returns True if process is successful, otherwise false
 */
async function setUserToken(userUUID: string, token: string | null): Promise<boolean> {
  try {
    await db.users.update({
      where: {
        userUUID: userUUID
      },
      data: {
        loginToken: token
      },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  };
};

export default setUserToken;