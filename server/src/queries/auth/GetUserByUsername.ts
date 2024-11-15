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
  });
  if(!user) return null;
  return {
    userUUID: user.userUUID,
    username: user.username,
    password: user.password,
    adminFlag: user.adminFlag,
    userSince: user.userSince,
    loginToken: user.loginToken,
  } as User;
};

export default getUserByUsername;