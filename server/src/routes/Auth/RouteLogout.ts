// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { LogoutReply } from "../../schemas/auth/SchemaLogout.js";
import JWTData from "../../types/JWTData.js";
import setUserToken from "../../queries/auth/SetUserToken.js";

/**
 * @Protected
 * Route to logout a user by removing their JWT from the DB
 */
const routeLogout = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Send confirmation
  rep.status(202).send({
    message: 'Logging Out',
  } as LogoutReply);

  // Try to logout user
  const userData: JWTData = req.user as JWTData;
  await setUserToken(userData.username, null);
  return;
};

export default routeLogout;
