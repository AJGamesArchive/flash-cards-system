// Imports
import { db } from "../../Server.js";

/**
 * Type to define the user data that needs validating to confirm a users login
 */
export type UserLoginChecks = {
  userUUID: string;
  username: string;
  password: string;
  adminFlag: boolean;
  apiAccount: boolean;
  deleted: boolean;
};

/**
 * Async function to fetch a the data required to login a user from the DB by a given username
 * @param username Username of users details to fetch
 * @return Required login checks object or null
 */
async function getUserLoginChecks(username: string): Promise<UserLoginChecks | null> {
  const user = await db.users.findUnique({
    where: {
      username: username
    },
    select: {
      userUUID: true,
      username: true,
      password: true,
      adminFlag: true,
      deleted: true,
      apiAccount: true,
    },
  });
  if(!user) return null;
  return user as UserLoginChecks;
};

export default getUserLoginChecks;