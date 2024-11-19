// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  GETUsersUserUUIDCollectionsParams,
  GETUsersUserUUIDCollectionsQuery,
  GETUsersUserUUIDCollectionsReply200,
  GETUsersUserUUIDCollectionsReplyError
} from "../../schemas/collections/SchemaGETUsersUserUUIDCollections.js";
import castJWTPayload from "../../functions/utilities/CastJWTPayload.js";
import JWTData from "../../types/JWTData.js";
import getCollections, { FullCollection } from "../../queries/collections/GetCollections.js";

/**
 * @protected
 * Route to fetch all the collections for a given user
 */
const routeGETUsersUserUUIDCollections = async (
  req: FastifyRequest<{
    Params: GETUsersUserUUIDCollectionsParams,
    Querystring: GETUsersUserUUIDCollectionsQuery,
  }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  const user: JWTData | null = await castJWTPayload(req);
  if(!user) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as GETUsersUserUUIDCollectionsReplyError);
    return;
  };

  // Ensure collections can only be fetched by their owner or an Admin
  if(req.params.userUUID !== user.uuid && !user.isAdmin) {
    rep.status(403).send({
      message: 'Cannot fetch other users collections',
    } as GETUsersUserUUIDCollectionsReplyError);
    return;
  };

  // Fetch users collections
  const collections: FullCollection[] = await getCollections(req.params.userUUID);
  if(collections.length === 0) {
    rep.status(404).send({
      message: 'No collections found',
    } as GETUsersUserUUIDCollectionsReplyError);
    return;
  };

  // Check query string to determine what data to send back
  if(!req.query.random) {
    // Send back all collections
    rep.status(200).send(collections.map((collection) => ({
      ...collection,
      createdAt: collection.createdOn.toISOString(),
      updatedAt: collection.updatedOn.toISOString(),
    } as GETUsersUserUUIDCollectionsReply200)) as GETUsersUserUUIDCollectionsReply200[]);
    return;
  };

  // Send back random collection
  const randomCollection: FullCollection = collections[Math.floor(Math.random() * collections.length)];
  rep.status(200).send([{
    ...randomCollection,
    createdAt: randomCollection.createdOn.toISOString(),
    updatedAt: randomCollection.updatedOn.toISOString(),
  }] as GETUsersUserUUIDCollectionsReply200[]);
  return;
};

export default routeGETUsersUserUUIDCollections;
