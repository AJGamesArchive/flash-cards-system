// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { DELETESetsSetUUIDParams, DELETESetsSetUUIDReplyError } from "../../schemas/sets/SchemaDELETESetsSetUUID.js";
import getSets from "../../queries/sets/GetSets.js";
import deleteSet from "../../queries/sets/DeleteSet.js";
import { FullSet } from "../../queries/sets/GetSets.js";
import JWTData from "../../types/JWTData.js";

/**
 * Route to delete a flashcard set and it's flashcards
 */
const routeDELETESetsSetUUID = async (
  req: FastifyRequest<{ Params: DELETESetsSetUUIDParams}>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  let userData: JWTData;
  try {
    userData = req.user as JWTData;
  } catch (error: any) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as DELETESetsSetUUIDReplyError);
    return;
  };

  // Fetch required data from DB
  const existingSet: FullSet[] = await getSets(undefined, req.params.setUUID);
  if(existingSet.length !== 1) {
    rep.status(404).send({
      message: 'Set Not Found',
    } as DELETESetsSetUUIDReplyError);
    return;
  };

  // Ensure the set being updated belongs to the user updating it
  if(existingSet[0].authorUUID !== userData.uuid) {
    rep.status(403).send({
      message: 'Set does not belong to you.',
    } as DELETESetsSetUUIDReplyError);
    return;
  };

  // Delete the set and it's flashcards
  const deleteStatus: number = await deleteSet(req.params.setUUID);
  if(deleteStatus !== 204) {
    rep.status(404).send({
      message: 'Set Not Found',
    } as DELETESetsSetUUIDReplyError);
    return;
  };

  // Return confirmation
  rep.status(204).send();
  return;
};

export default routeDELETESetsSetUUID;
