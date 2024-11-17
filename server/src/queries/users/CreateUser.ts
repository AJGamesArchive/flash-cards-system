// Imports
import { db } from "../../Server.js";
import { FullUser } from "../../types/User.js";

/**
 * Async function to create a new user
 * @param newUser New User Data
 * @returns Front-facing user data object or null if creation failed
 */
async function createUser(newUser: FullUser): Promise<boolean> {
  try {
    await db.users.create({
      data: newUser,
    });
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  };
};

export default createUser;