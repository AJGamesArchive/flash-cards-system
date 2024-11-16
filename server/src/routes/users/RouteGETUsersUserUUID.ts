// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  GETUsersUserUUIDParams,
  GETUsersUserUUIDReply200,
  GETUsersUserUUIDReplyError
} from "../../schemas/users/SchemaGETUsersUserUUID.js";
import getUsers from "../../queries/users/GetUsers.js";
import User from "../../types/User.js";

/**
 * @protected
 * Route to fetch a user from the DB by given user UUID
 */
const routeGETUsersUserUUID = async (
  req: FastifyRequest<{ Params: GETUsersUserUUIDParams }>,
  rep: FastifyReply
): Promise<void> => {
  const user: User[] = await getUsers(req.params.userUUID);
  if(user.length !== 1) {
    rep.status(404).send({
      message: "User Not Found",
    } as GETUsersUserUUIDReplyError);
    return;
  };
  rep.status(200).send({
    ...user[0],
    userSince: user[0].userSince.toISOString(),
  } as GETUsersUserUUIDReply200);
  return;
};

export default routeGETUsersUserUUID;
