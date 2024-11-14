// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { LogoutReply } from "../../schemas/Auth/SchemaLogout.js";
import JWTData from "../../types/RequestUser.js";
import { db } from "../../Server.js";

/**
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
  try {
    const userData: JWTData = req.user as JWTData;
    await db.users.update({
      where: {
        userUUID: userData.uuid,
      },
      data: {
        loginToken: null,
      },
    });
  } catch (error: any) {
    // Log any errors
    console.error(error);
    return;
  };
};

export default routeLogout;
