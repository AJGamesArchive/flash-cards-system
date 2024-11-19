// Imports
import { db } from "../../Server.js";
import { FullCollection } from "./GetCollections.js";

/**
 * Async function to update the name and description of a collection by UUID
 * @param userUUID UUID of collection author
 * @param collectionUUID UUID of collection to update
 * @param name New collection name
 * @param description New collection description
 * @returns True if process is successful, otherwise false
 */
async function updateCollection(userUUID: string, collectionUUID: string, name: string, description: string): Promise<FullCollection | null> {
  try {
    const updatedCollection = await db.collections.update({
      where: {
        collectionUUID: collectionUUID,
        authorUUID: userUUID,
      },
      data: {
        name: name,
        description: description,
        updatedOn: new Date(),
      },
      include: {
        collectionAllocation: true,
      },
    });
    return {
      ...updatedCollection,
      numSets: updatedCollection.collectionAllocation.length
    } as FullCollection;
  } catch (error: any) {
    console.error(error);
    return null;
  };
};

export default updateCollection;