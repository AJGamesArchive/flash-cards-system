// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  ConfirmLoginReply200,
  ConfirmLoginReply401,
} from "../../schemas/auth/SchemaConfirmLogin.js";
import JWTData from "../../types/JWTData.js";
import isUserTokenCurrent from "../../queries/IsUserTokenCurrent.js";

/**
 * Route to authenticate whether a user is currently logged in
 */
const routeConfirmLogin = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Try to auth user
  try {
    // Verify JWT
    await req.jwtVerify();
    const userData: JWTData = req.user as JWTData;

    // Verify JWT is newest user token
    const current: boolean = await isUserTokenCurrent(userData.uuid, req.headers.authorization);
    if(!current) throw new Error("User Token Outdated");

    // Return confirmation and core user data 
    rep.status(200).send({
      loggedIn: true,
      user: userData,
    } as ConfirmLoginReply200);
    return;
  } catch (error: any) {
    // Return unauthorized error
    console.warn(error);
    rep.status(401).send({
      loggedIn: false,
    } as ConfirmLoginReply401);
    return;
  };
};

export default routeConfirmLogin;
