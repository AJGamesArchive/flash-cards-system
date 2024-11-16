// Imports
import { db } from "../../Server.js";

/**
 * Async function to validate that a users JWT is their most recent token
 * @param userUUID UUID of user to check token against
 * @param reqAuth Request Authorization Header
 * @returns True is token is current, otherwise false
 */
async function isUserTokenCurrent(userUUID: string, reqAuth: string | undefined): Promise<boolean> {
  const user = await db.users.findUnique({
    where: {
      userUUID: userUUID,
    },
  });
  return !!(user && !user.deleted && `Bearer ${user.loginToken}` === reqAuth);
};

export default isUserTokenCurrent;