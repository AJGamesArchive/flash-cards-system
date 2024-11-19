// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { GETCollectionsReply200 } from "../../schemas/collections/SchemaGETCollections.js";
import getCollections, { FullCollection } from "../../queries/collections/GetCollections.js";

/**
 * @protected Admin |
 * Route to fetch all the collections in the system
 */
const routeGETCollections = async (
  _req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  const allCollections: FullCollection[] = await getCollections();
  rep.status(200).send(allCollections.map((collection) => ({
    ...collection,
    createdAt: collection.createdOn.toISOString(),
    updatedAt: collection.updatedOn.toISOString(),
  } as GETCollectionsReply200)) as GETCollectionsReply200[]);
  return;
};

export default routeGETCollections;
