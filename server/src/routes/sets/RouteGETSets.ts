// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { GETSetsReply200 } from "../../schemas/sets/SchemaGETSets.js";
import getSets, { FullSet } from "../../queries/sets/GetSets.js";

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
    ...fullSet,
    createdAt: fullSet.createdAt.toISOString(),
    updatedAt: fullSet.updatedAt.toISOString(),
  } as GETSetsReply200)) as GETSetsReply200[]);
  return;
};

export default routeGETSets;
