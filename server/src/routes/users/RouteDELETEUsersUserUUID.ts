// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  DELETEUsersUserUUIDParams,
  DELETEUsersUserUUIDReplyError
} from "../../schemas/users/SchemaDELETEUsersUserUUID.js";
import JWTData from "../../types/JWTData.js";
import softDeleteUser from "../../queries/users/SoftDeleteUser.js";
import castJWTPayload from "../../functions/utilities/CastJWTPayload.js";

/**
 * @protected
 * Route to soft delete a user
 * @note Regular users can only delete their own account
 * @note Admin users cannot delete the base Admin Account
 */
const routeDELETEUsersUserUUID = async (
  req: FastifyRequest<{ Params: DELETEUsersUserUUIDParams }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  const user: JWTData | null = await castJWTPayload(req);
  if(!user) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as DELETEUsersUserUUIDReplyError);
    return;
  };

  // Ensure you have permission to delete the requested account
  if(user.isAdmin) {
    if(req.params.userUUID === 'ba57db28-61e3-42b8-840d-0e5908ef7603') {
      rep.status(403).send({
        message: "Cannot Delete Base Admin Account",
      } as DELETEUsersUserUUIDReplyError);
      return;
    };
  } else {
    if(req.params.userUUID !== user.uuid) {
      rep.status(403).send({
        message: "Cannot Delete Account",
      } as DELETEUsersUserUUIDReplyError);
      return;
    };
  };

  // Delete the user
  const success: boolean = await softDeleteUser(req.params.userUUID);
  if(!success) {
    rep.status(404).send({
      message: "User Not Found",
    } as DELETEUsersUserUUIDReplyError);
    return;
  };

  // Return success
  rep.status(204).send({});
  return;
};

export default routeDELETEUsersUserUUID;
