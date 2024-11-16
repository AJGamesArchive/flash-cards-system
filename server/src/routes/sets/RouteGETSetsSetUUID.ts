// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  GETSetsSetUUIDReply200,
  GETSetsSetUUIDReplyError,
  GETSetsSetUUIDParams
} from "../../schemas/sets/SchemaGETSetsSetUUID.js";
import getSets from "../../queries/sets/GetSets.js";
import { FullSet } from "../../queries/sets/GetSets.js";

/**
 * Route to fetch a set and it's reviews by a given setUUID
 */
const routeGETSetSetUUID = async (
  req: FastifyRequest<{ Params: GETSetsSetUUIDParams }>,
  rep: FastifyReply
): Promise<void> => {
  // Fetch specified flashcard sets and their reviews
  const sets: FullSet[] = await getSets(undefined, req.params.setUUID);

  // Ensure correct set was found
  if(sets.length !== 1) {
    rep.status(404).send({
      message: "Set Not Found",
    } as GETSetsSetUUIDReplyError);
    return;
  };

  // Map data to reply schema and send data
  rep.status(200).send({
    setDetails: {
      ...sets[0].setDetails,
      createdAt: sets[0].setDetails.createdAt.toISOString(),
      updatedAt: sets[0].setDetails.updatedAt.toISOString(),
    },
    reviews: sets[0].reviews.map((setReview) => ({
      ...setReview,
      reviewDate: setReview.reviewDate.toISOString(),
    })),
  } as GETSetsSetUUIDReply200);
  return;
};

export default routeGETSetSetUUID;
