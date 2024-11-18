// Imports
import { db } from "../../Server.js";

/**
 * Async function to delete a hidden card allocation for a given user
 * @param userUUID UUID of user to delete allocation for
 * @param cardUUID UUID of card to delete allocation for
 * @returns True of process was successful, otherwise false
 */
async function deleteUserCardAllocation(userUUID: string, cardUUID: string): Promise<boolean> {
  try {
    await db.hiddenCardAllocation.delete({
      where: {
        userUUID_cardUUID: {
          userUUID: userUUID,
          cardUUID: cardUUID,
        },
      },
    });
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  };
};

export default deleteUserCardAllocation;