// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  POSTSetsRequest,
  POSTSetsReply201,
  POSTSetsReplyError
} from "../../schemas/sets/SchemaPOSTSets.js";
import Flashcard from "../../types/Flashcard.js";
import FlashcardSet from "../../types/FlashcardSet.js";
import JWTData from "../../types/JWTData.js";
import allowSetCreation from "../../functions/AllowSetCreation.js";
import { v4 as uuidGen } from 'uuid';
import { db } from "../../Server.js";

/**
 * @protected
 * Route to create a new flashcard set with flashcards by a given user - defaulting to the current user
 */
const routePOSTSets = async (
  req: FastifyRequest<{ Body: POSTSetsRequest }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  let userData: JWTData;
  try {
    userData = req.user as JWTData;
  } catch (error: any) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as POSTSetsReplyError);
    return;
  };

  // Check if flashcard set creation limit
  const today: Date = new Date();
  const allowed: boolean = await allowSetCreation(userData, rep);
  if(!allowed) return;

  // Fetch difficulty data from DB
  const difficulties = await db.difficulties.findMany();
  if(difficulties.length === 0) {
    rep.status(404).send({
      message: 'Flashcard creation difficulties could not be loaded.',
    } as POSTSetsReplyError);
    return;
  };

  // Prepare data to write to DB
  const newSetUUID: string = uuidGen();
  const newSet: FlashcardSet = {
    setUUID: newSetUUID,
    name: req.body.setDetails.name,
    description: req.body.setDetails.description,
    createdAt: today,
    updatedAt: today,
    authorUUID: req.body.setDetails.authorUUID || userData.uuid,
  };
  // Map over passed flashcard data and generate flashcard objects
  const newFlashcards: Flashcard[] = req.body.flashCards.map((flashcard) => {
    // Get difficulty object for current card
    const difficulty = difficulties.find((d) => d.value === flashcard.difficulty) || difficulties[0];
    return {
      cardUUID: uuidGen(),
      question: flashcard.question,
      answer: flashcard.answer,
      difficulty: difficulty.difficultyUUID,
      createdAt: today,
      updatedAt: today,
      setUUID: newSetUUID,
    } as Flashcard;
  });

  // Generate DB update queries for each set amd flashcard
  let queries: any[] = [];
  queries.push(db.sets.create({
    data: {
      setUUID: newSet.setUUID,
      name: newSet.name,
      description: newSet.description,
      createdAt: newSet.createdAt,
      updatedAt: newSet.updatedAt,
      author: {
        connect: {
          userUUID: newSet.authorUUID,
        },
      },
    },
  }));
  newFlashcards.forEach((flashcard) => queries.push(db.flashCards.create({
    data: {
      cardUUID: flashcard.cardUUID,
      question: flashcard.question,
      answer: flashcard.answer,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt,
      set: {
        connect: {
          setUUID: flashcard.setUUID,
        },
      },
      difficulty: {
        connect: {
          difficultyUUID: flashcard.difficulty,
        },
      },
    },
  })));

  // Make all DB updates in transaction
  try {
    await db.$transaction(queries);
  } catch (error: any) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as POSTSetsReplyError);
    return;
  };

  // Return created set and flashcards
  rep.status(201).send({
    setDetails: {
      ...newSet,
      createdAt: newSet.createdAt.toISOString(),
      updateAt: newSet.updatedAt.toISOString(),
    },
    flashCards: newFlashcards.map((flashcard) => ({
      ...flashcard,
      createdAt: flashcard.createdAt.toISOString(),
      updateAt: flashcard.updatedAt.toISOString(),
    })),
  } as POSTSetsReply201);
};

export default routePOSTSets;
