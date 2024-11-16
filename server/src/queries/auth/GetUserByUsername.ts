// Imports
import { db } from "../../Server.js";
import User from "../../types/User.js";

/**
 * Async function to fetch a user from the DB from a given username
 * @param username Username of user to fetch
 * @return A User object or null if no user is found
 */
async function getUserByUsername(username: string): Promise<User | null> {
  const user = await db.users.findUnique({
    where: {
      username: username
    },
    select: {
      userUUID: true,
      username: true,
      adminFlag: true,
      userSince: true,
      loginToken: true,
      deleted: true,
    },
  });
  if(!user) return null;
  return user as User;
};

export default getUserByUsername;