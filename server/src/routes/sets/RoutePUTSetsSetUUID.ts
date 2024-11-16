// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  PUTSetsSetUUIDParams,
  PUTSetsSetUUIDRequest,
  PUTSetsSetUUIDReply200,
  PUTSetsSetUUIDReplyError
} from "../../schemas/sets/SchemaPUTSetsSetUUID.js";
import saveFlashcardSet from "../../queries/sets/SaveFlashcardSet.js";
import getSets, { FullSet } from "../../queries/sets/GetSets.js";
import getDifficulties from "../../queries/difficulties/GetDifficulties.js";
import FlashcardSet from "../../types/FlashcardSet.js";
import Flashcard from "../../types/Flashcard.js";
import Difficulty from "../../types/Difficulty.js";
import JWTData from "../../types/JWTData.js";

/**
 * @protected
 * Route to update a flashcard set and it's flashcards
 */
const routePUTSetsSetUUID = async (
  req: FastifyRequest<{ Params: PUTSetsSetUUIDParams, Body: PUTSetsSetUUIDRequest }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  let userData: JWTData;
  try {
    userData = req.user as JWTData;
  } catch (error: any) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as PUTSetsSetUUIDReplyError);
    return;
  };

  // Fetch required data from DB
  const [existingSet, difficulties]: [FullSet[], Difficulty[]] = await Promise.all([
    getSets(undefined, req.body.setDetails.setUUID),
    getDifficulties(),
  ]);
  if(existingSet.length !== 1 || difficulties.length === 0) {
    rep.status(404).send({
      message: (existingSet.length !== 1) ?
        'Set Not Found' :
        'Flashcard difficulties could not be loaded.',
    } as PUTSetsSetUUIDReplyError);
    return;
  };

  // Ensure the set being updated belongs to the user updating it
  if(existingSet[0].authorUUID !== userData.uuid) {
    rep.status(403).send({
      message: 'Set does not belong to you.',
    } as PUTSetsSetUUIDReplyError);
    return;
  };

  // Prepare data to write to DB
  const set: FlashcardSet = {
    setUUID: req.body.setDetails.setUUID,
    name: req.body.setDetails.name,
    description: req.body.setDetails.description,
    createdAt: new Date(req.body.setDetails.createdAt),
    updatedAt: new Date(),
    authorUUID: req.body.setDetails.authorUUID,
  };
  // Map over passed flashcard data and generate flashcard objects
  const flashcards: Flashcard[] = req.body.flashCards.map((flashcard) => {
    // Get difficulty object for current card
    const difficulty = difficulties.find((d) => d.value === flashcard.difficulty) || difficulties[0];
    return {
      cardUUID: flashcard.cardUUID,
      question: flashcard.question,
      answer: flashcard.answer,
      difficulty: difficulty.difficultyUUID,
      createdAt: new Date(flashcard.createdAt),
      updatedAt: new Date(),
      setUUID: flashcard.setUUID,
    } as Flashcard;
  });

  // Ensure the set is not empty
  if(flashcards.length === 0) {
    rep.status(400).send({
      message: 'Missing Flashcards',
    } as PUTSetsSetUUIDReplyError);
    return;
  };

  // Update the flashcard set and flashcards in the DB
  const saveStatus: number = await saveFlashcardSet(set, flashcards);
  if(saveStatus !== 200) {
    rep.status(saveStatus).send({
      message: (saveStatus === 404) ? "Set Not Found" : "Something went wrong, please try again.",
    } as PUTSetsSetUUIDReplyError);
    return;
  };

  // Return updated set and flashcards
  rep.status(200).send({
    setDetails: {
      ...set,
      createdAt: set.createdAt.toISOString(),
      updateAt: set.updatedAt.toISOString(),
    },
    flashCards: flashcards.map((flashcard) => ({
      ...flashcard,
      createdAt: flashcard.createdAt.toISOString(),
      updateAt: flashcard.updatedAt.toISOString(),
    })),
  } as PUTSetsSetUUIDReply200);
  return;
};

export default routePUTSetsSetUUID;
