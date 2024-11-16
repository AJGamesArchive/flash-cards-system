// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { GETUsersReply200 } from "../../schemas/users/SchemaGETUsers.js";
import getUsers from "../../queries/users/GetUsers.js";
import User from "../../types/User.js";

/**
 * @protected Admin | 
 * Route to fetch all users from the DB
 */
const routeGETUsers = async (
  _req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  const users: User[] = await getUsers();
  rep.status(200).send(users.map((user) => ({
    ...user,
    userSince: user.userSince.toISOString(),
  } as GETUsersReply200)) as GETUsersReply200[]);
  return;
};

export default routeGETUsers;
