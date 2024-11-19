// Imports
import { db } from "../../Server.js";
import Collection from "../../types/Collection.js";

/**
 * Async function to create a collection for a given user
 * @param userUUID UUID of user to create collection for
 * @param collection Collect data
 * @returns True if process was successful, otherwise false
 */
async function createCollection(userUUID: string, collection: Collection): Promise<boolean> {
  try {
    await db.collections.create({
      data: {
        collectionUUID: collection.collectionUUID,
        name: collection.name,
        description: collection.description,
        createdOn: collection.createdOn,
        updatedOn: collection.updatedOn,
        author: {
          connect: {
            userUUID: userUUID,
          },
        },
      },
    });
    return true;
  } catch(error: any) {
    console.error(error);
    return false;
  };
};

export default createCollection;