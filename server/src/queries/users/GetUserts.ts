// Imports
import { db } from "../../Server.js";
import User from "../../types/User.js";

/**
 * Async function to retrieve a user from the database based on given params
 * @note Fetches all sets if no params are passed
 * @param userUUID Optional - UUID of specific user to fetch
 * @returns User Object Array
 */
async function getUsers(userUUID?: string): Promise<User[]> {
  // Define variables to store base fetched data
  let userQuery

  // Fetch data from DB
  if(userUUID) {
    userQuery = await db.users.findMany({
      where: {
        userUUID: userUUID,
      },
      select: {
        userUUID: true,
        username: true,
        adminFlag: true,
        userSince: true,
        deleted: true,
      },
    });
  } else {
    userQuery = await db.users.findMany({
      select: {
        userUUID: true,
        username: true,
        adminFlag: true,
        userSince: true,
        deleted: true,
      },
    });
  };

  // Return mapped data
  return userQuery as User[];
};

export default getUsers;