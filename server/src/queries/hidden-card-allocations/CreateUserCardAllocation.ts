// Imports
import { db } from "../../Server.js";

/**
 * Async function to create a hidden card allocation for a given user
 * @param userUUID UUID of user to create hidden card allocation for
 * @param cardUUID UUID of card to create hidden card allocation for
 * @returns True if process is successful, otherwise false
 */
async function createUserCardAllocation(userUUID: string, cardUUID: string): Promise<boolean> {
  try {
    await db.hiddenCardAllocation.create({
      data: {
        userUUID: userUUID,
        cardUUID: cardUUID,
      },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  };
};

export default createUserCardAllocation;