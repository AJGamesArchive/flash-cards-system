// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  PATCHUsersUserUUIDCollectionsCollectionUUIDParams,
  PATCHUsersUserUUIDCollectionsCollectionUUIDRequest,
  PATCHUsersUserUUIDCollectionsCollectionUUIDReply200,
  PATCHUsersUserUUIDCollectionsCollectionUUIDReplyError
} from "../../schemas/collections/SchemaPATCHUsersUserUUIDCollectionsCollectionUUID.js";
import castJWTPayload from "../../functions/utilities/CastJWTPayload.js";
import JWTData from "../../types/JWTData.js";
import updateCollection from "../../queries/collections/UpdateCollection.js";
import { FullCollection } from "../../queries/collections/GetCollections.js";

/**
 * @protected
 * Route to update a collection for a given user
 */
const routePATCHUsersUserUUIDCollectionsCollectionUUID = async (
  req: FastifyRequest<{
    Params: PATCHUsersUserUUIDCollectionsCollectionUUIDParams,
    Body: PATCHUsersUserUUIDCollectionsCollectionUUIDRequest,
  }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  const user: JWTData | null = await castJWTPayload(req);
  if(!user) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as PATCHUsersUserUUIDCollectionsCollectionUUIDReplyError);
    return;
  };

  // Ensure collections can only be updated by their account owner
  if(req.params.userUUID !== user.uuid) {
    rep.status(403).send({
      message: 'Cannot update collections for other users',
    } as PATCHUsersUserUUIDCollectionsCollectionUUIDReplyError);
    return;
  };

  // Add new collection to DB
  const updatedCollection: FullCollection | null = await updateCollection(req.params.userUUID, req.params.collectionUUID, req.body.name, req.body.description);
  if(!updatedCollection) {
    rep.status(404).send({
      message: "Collection Not Found",
    } as PATCHUsersUserUUIDCollectionsCollectionUUIDReplyError);
    return;
  };

  // Return created collection
  rep.status(200).send({
    ...updatedCollection,
    createdAt: updatedCollection.createdOn.toISOString(),
    updatedAt: updatedCollection.updatedOn.toISOString(),
  } as PATCHUsersUserUUIDCollectionsCollectionUUIDReply200);
  return;
};

export default routePATCHUsersUserUUIDCollectionsCollectionUUID;
