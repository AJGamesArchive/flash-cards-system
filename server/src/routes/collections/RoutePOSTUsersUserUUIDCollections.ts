// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  POSTUsersUserUUIDCollectionsParams,
  POSTUsersUserUUIDCollectionsRequest,
  POSTUsersUserUUIDCollectionsReply201,
  POSTUsersUserUUIDCollectionsReplyError
} from "../../schemas/collections/SchemaPOSTUsersUserUUIDCollections.js";
import castJWTPayload from "../../functions/utilities/CastJWTPayload.js";
import JWTData from "../../types/JWTData.js";
import Collection from "../../types/Collection.js";
import { v4 as uuidGen } from 'uuid';
import createCollection from "../../queries/collections/CreateCollection.js";

/**
 * @protected
 * Route to create a collection for a given user
 */
const routePOSTUsersUserUUIDCollections = async (
  req: FastifyRequest<{
    Params: POSTUsersUserUUIDCollectionsParams,
    Body: POSTUsersUserUUIDCollectionsRequest,
  }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  const user: JWTData | null = await castJWTPayload(req);
  if(!user) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as POSTUsersUserUUIDCollectionsReplyError);
    return;
  };

  // Ensure collections can only be created their account owner
  if(req.params.userUUID !== user.uuid) {
    rep.status(403).send({
      message: 'Cannot create collections for other users',
    } as POSTUsersUserUUIDCollectionsReplyError);
    return;
  };

  // Create collection object
  const now: Date = new Date();
  const newCollection: Collection = {
    collectionUUID: uuidGen(),
    name: req.body.name,
    description: req.body.description,
    createdOn: now,
    updatedOn: now,
    authorUUID: user.uuid,
  };

  // Add new collection to DB
  const success: boolean = await createCollection(user.uuid, newCollection);
  if(!success) {
    rep.status(404).send({
      message: "User Not Found",
    } as POSTUsersUserUUIDCollectionsReplyError);
    return;
  };

  // Return created collection
  rep.status(201).send({
    ...newCollection,
    createdAt: newCollection.createdOn.toISOString(),
    updatedAt: newCollection.updatedOn.toISOString(),
    numSets: 0,
  } as POSTUsersUserUUIDCollectionsReply201);
  return;
};

export default routePOSTUsersUserUUIDCollections;
