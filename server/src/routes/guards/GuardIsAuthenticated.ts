// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { AuthenticateReplyError } from "../../schemas/guards/SchemaIsAuthenticated.js";

/**
 * Guard Route to authenticate a request by validating the JWT
 */
const guardAuthenticate = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Try to auth the JWT
  try {
    await req.jwtVerify();
  } catch (error: any) {
    console.warn(error);
    rep.status(401).send({
      message: "Unauthorized",
    } as AuthenticateReplyError);
  }
};

export default guardAuthenticate;
