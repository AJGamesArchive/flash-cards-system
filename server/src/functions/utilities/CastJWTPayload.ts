// Imports
import JWTData from "../../types/JWTData.js";
import { FastifyRequest } from "fastify";

/**
 * Async function to type-cast the JWT payload after authentication
 * @param req Incoming Request Object
 * @returns JWT Payload
 */
async function castJWTPayload(req: FastifyRequest): Promise<JWTData | null> {
  try {
    const user: JWTData = await req.jwtDecode<JWTData>();
    return user;
  } catch (_error: any) {
    return null;
  };
};

export default castJWTPayload;