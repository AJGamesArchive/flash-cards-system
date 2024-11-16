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
    });
  } else {
    userQuery = await db.users.findMany();
  };

  // Map over all fetched sets and generate FullSet objects
  const users: User[] = userQuery.map((user) => ({
    userUUID: user.userUUID,
    username: user.username,
    password: user.password,
    adminFlag: user.adminFlag,
    loginToken: user.loginToken,
    deleted: user.deleted,
    userSince: user.userSince,
  } as User ));

  // Return mapped data
  return users;
};

export default getUsers;