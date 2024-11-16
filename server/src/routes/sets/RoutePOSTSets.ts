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
import allowSetCreation from "../../functions/sets/AllowSetCreation.js";
import getDifficulties from "../../queries/difficulties/GetDifficulties.js";
import Difficulty from "../../types/Difficulty.js";
import saveFlashcardSet from "../../queries/sets/SaveFlashcardSet.js";
import { v4 as uuidGen } from 'uuid';

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
  const allowedStatus: number = await allowSetCreation(userData);
  if(allowedStatus !== 200) {
    rep.status(allowedStatus).send({
      message:
        (allowedStatus === 404) ?
          "Flashcard creation config could not be loaded." :
        (allowedStatus === 429) ?
          'You have reached the maximum number of flashcard set creations allowed today.' :
          'Something went wrong, please try again.',
    } as POSTSetsReplyError);
    return;
  };

  // Fetch difficulty data from DB
  const difficulties: Difficulty[] = await getDifficulties();
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

  // Ensure the set contains flashcards
  if(newFlashcards.length === 0) {
    rep.status(400).send({
      message: 'Missing Flashcards',
    } as POSTSetsReplyError);
    return;
  };

  // Add the flashcard set and flashcards in the DB
  const saveStatus: number = await saveFlashcardSet(newSet, newFlashcards, true);
  if(saveStatus !== 200) {
    rep.status(saveStatus).send({
      message: (saveStatus === 404) ? "Set Not Found" : "Something went wrong, please try again.",
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
  return;
};

export default routePOSTSets;
