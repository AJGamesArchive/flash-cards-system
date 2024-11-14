// Imports
import { FastifyReply } from 'fastify';
import { POSTSetsReplyError } from '../schemas/sets/SchemaPOSTSets.js';
import JWTData from '../types/JWTData.js';
import { db } from '../Server.js';

/**
 * Async function to fetch the set creation limit config and allow or reject new set creations
 * @param userDate Current use date from JWT
 * @param rep Fastify Reply object
 * @returns True if creation is permitted, otherwise false
 */
async function allowSetCreation(userDate: JWTData, rep: FastifyReply): Promise<boolean> {
  // Permit set creation is user is an admin
  if(userDate.isAdmin) return true;

  // Fetch card limit config data
  const setLimitConfig = await db.systemConfig.findUnique({
    where: {
      configUUID: "7d6456e7-53f9-4d23-a547-a2590dd5bc30",
    },
  });
  if(!setLimitConfig) {
    rep.status(404).send({
      message: 'Flashcard creation config could not be loaded.',
    } as POSTSetsReplyError);
    return false;
  };

  // Create current date object
  const today = new Date();

  if(setLimitConfig.currentDate === today) {
    // Return error if set creation counter for today has been reached
    if(setLimitConfig.creationCounter >= setLimitConfig.setCreationLimit) {
      rep.status(429).send({
        message: 'You have reached the maximum number of flashcard set creations allowed today.'
      } as POSTSetsReplyError);
      return false;
    };

    // Increment creation counter
    try {
      await db.systemConfig.update({
        where: {
          configUUID: "7d6456e7-53f9-4d23-a547-a2590dd5bc30",
        },
        data: {
          creationCounter: setLimitConfig.creationCounter + 1, 
        },
      });
    } catch (error: any) {
      rep.status(500).send({
        message: 'Something went wrong, please try again.',
      } as POSTSetsReplyError);
      return false;
    };
  } else {
    // Reset the creation counter for the new day
    try {
      await db.systemConfig.update({
        where: {
          configUUID: "7d6456e7-53f9-4d23-a547-a2590dd5bc30",
        },
        data: {
          creationCounter: 1,
          currentDate: today,
        },
      });
    } catch (error: any) {
      rep.status(500).send({
        message: 'Something went wrong, please try again.',
      } as POSTSetsReplyError);
      return false;
    };
  };

  // Return true all if checks pass and set creation is permitted
  return true;
};

export default allowSetCreation;