// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../../Server.js";

/**
 * Route to return all flashcard sets
 */
const routeGETSets = async (
  _req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Fetch all flashcard sets from the database11
  const sets = await db.sets.findMany();
  rep.status(200).send(sets);
  return;
};

export default routeGETSets;
