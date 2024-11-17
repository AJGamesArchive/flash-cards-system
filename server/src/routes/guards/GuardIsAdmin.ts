// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import { IsAdminReplyError } from "../../schemas/guards/SchemaIsAdmin.js";
import JWTData from "../../types/JWTData.js";
import castJWTPayload from "../../functions/utilities/CastJWTPayload.js";

/**
 * Guard Route to authenticate is the incoming request is from an admin
 */
const guardIsAdmin = async <B, P, Q>(
  req: FastifyRequest<{ Body: B, Params: P, Querystring: Q }>,
  rep: FastifyReply
): Promise<void> => {
  // Try to auth the JWT
  try {
    const user: JWTData | null = await castJWTPayload(req);
    if (!user || !user.isAdmin) throw new Error("Not Admin");
  } catch (error: any) {
    console.warn(error);
    rep.status(403).send({
      message: "Forbidden",
    } as IsAdminReplyError);
  };
};

export default guardIsAdmin;
