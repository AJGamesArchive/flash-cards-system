// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  ConfirmLoginReply200,
  ConfirmLoginReply401,
} from "../../schemas/Auth/SchemaConfirmLogin.js";
import JWTData from "../../types/RequestUser.js";

/**
 * Route to authenticate whether a user is currently logged in
 */
const routeConfirmLogin = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Try to auth user
  try {
    await req.jwtVerify();
    const userData: JWTData = req.user as JWTData;
    rep.status(200).send({
      loggedIn: true,
      user: userData,
    } as ConfirmLoginReply200);
  } catch (error: any) {
    console.warn(error);
    rep.status(401).send({
      loggedIn: false,
    } as ConfirmLoginReply401);
  }
};

export default routeConfirmLogin;
