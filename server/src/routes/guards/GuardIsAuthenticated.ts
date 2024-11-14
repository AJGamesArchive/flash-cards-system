// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { AuthenticateReplyError } from "../../schemas/guards/SchemaIsAuthenticated.js";
import JWTData from "../../types/JWTData.js";
import isUserTokenCurrent from "../../queries/IsUserTokenCurrent.js";

/**
 * Guard Route to authenticate a request by validating the JWT
 */
const guardAuthenticate = async <T>(
  req: FastifyRequest<{ Body: T }>,
  rep: FastifyReply
): Promise<void> => {
  // Try to auth the JWT
  try {
    await req.jwtVerify();
    const userData: JWTData = req.user as JWTData;
    const current: boolean = await isUserTokenCurrent(userData.uuid, req.headers.authorization);
    if(!current) throw new Error("User Token Outdated");
  } catch (error: any) {
    console.warn(error);
    rep.status(401).send({
      message: "You are not logged in.",
    } as AuthenticateReplyError);
  };
};

export default guardAuthenticate;
