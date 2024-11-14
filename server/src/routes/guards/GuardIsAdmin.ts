// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { IsAdminReplyError } from "../../schemas/guards/SchemaIsAdmin.js";
import JWTData from "../../types/RequestUser.js";

/**
 * Guard Route to authenticate is the incoming request is from an admin
 */
const guardIsAdmin = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Try to auth the JWT
  try {
    const userData: JWTData = req.user as JWTData;
    if (!userData.isAdmin) throw new Error("Not Admin");
  } catch (error: any) {
    console.warn(error);
    rep.status(403).send({
      message: "Forbidden",
    } as IsAdminReplyError);
  }
};

export default guardIsAdmin;
