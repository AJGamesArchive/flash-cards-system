// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { GETSetsReply200 } from "../../schemas/sets/SchemaGETSets";
import getSets, { FullSet } from "../../queries/sets/GetSets";

/**
 * Route to return all flashcard sets
 */
const routeGETSets = async (
  _req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Fetch all flashcard sets and their reviews
  const sets: FullSet[] = await getSets();

  // Map data to reply schema and send data
  rep.status(200).send(sets.map((fullSet) => ({
    setDetails: {
      ...fullSet.setDetails,
      createdAt: fullSet.setDetails.createdAt.toISOString(),
      updatedAt: fullSet.setDetails.updatedAt.toISOString(),
    },
    reviews: fullSet.reviews.map((setReview) => ({
      ...setReview,
      reviewDate: setReview.reviewDate.toISOString(),
    })),
  })) as GETSetsReply200[]);
  return;
};

export default routeGETSets;
