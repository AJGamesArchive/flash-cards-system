// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  DELETEUsersUserUUIDCollectionsCollectionUUIDParams,
  DELETEUsersUserUUIDCollectionsCollectionUUIDReplyError
} from "../../schemas/collections/SchemaDELETEUsersUserUUIDCollectionsCollectionUUID.js";
import castJWTPayload from "../../functions/utilities/CastJWTPayload.js";
import JWTData from "../../types/JWTData.js";
import deleteCollection from "../../queries/collections/DeleteCollection.js";

/**
 * @protected
 * Route to delete a collection for a given user
 */
const routeDELETEUsersUserUUIDCollectionsCollectionUUID = async (
  req: FastifyRequest<{
    Params: DELETEUsersUserUUIDCollectionsCollectionUUIDParams,
  }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  const user: JWTData | null = await castJWTPayload(req);
  if(!user) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as DELETEUsersUserUUIDCollectionsCollectionUUIDReplyError);
    return;
  };

  // Ensure collections can only be delete by their account owner
  if(req.params.userUUID !== user.uuid) {
    rep.status(403).send({
      message: 'Cannot delete collections for other users',
    } as DELETEUsersUserUUIDCollectionsCollectionUUIDReplyError);
    return;
  };

  // Add new collection to DB
  const success: boolean = await deleteCollection(req.params.userUUID, req.params.collectionUUID);
  if(!success) {
    rep.status(404).send({
      message: "Collection Not Found",
    } as DELETEUsersUserUUIDCollectionsCollectionUUIDReplyError);
    return;
  };

  // Return created collection
  rep.status(204).send();
  return;
};

export default routeDELETEUsersUserUUIDCollectionsCollectionUUID;
