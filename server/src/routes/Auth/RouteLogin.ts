// Imports
import * as bcrypt from "bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  LoginRequest,
  LoginReply200,
  LoginReplyError,
} from "../../schemas/auth/SchemaLogin.js";
import server, { db } from "../../Server.js";

/**
 * Route to login a user
 */
const routeLogin = async (
  req: FastifyRequest<{ Body: LoginRequest }>,
  rep: FastifyReply
): Promise<void> => {
  // Fetch user
  const user = await db.users.findUnique({
    where: {
      username: req.body.username
    },
  });

  // Return unauthorized if no user is found
  if (!user) {
    rep.status(401).send({
      message: "Invalid Credentials",
    } as LoginReplyError);
    return;
  }

  // Check if password is correct
  const correct: boolean = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!correct) {
    rep.status(401).send({
      message: "Invalid Credentials",
    } as LoginReplyError);
    return;
  }

  // Generate token
  const token: string = server.jwt.sign({
    username: user.username,
    uuid: user.userUUID,
    isAdmin: user.adminFlag,
  }, {
    expiresIn: 604800, // 1 week
  });

  // Save token to DB
  try {
    await db.users.update({
      where: {
        userUUID: user.userUUID
      },
      data: {
        loginToken: token
      }
    });
  } catch (error: any) {
    console.error(error);
    rep.status(500).send({
      message: 'Failed to generate login token.',
    } as LoginReplyError);
    return;
  };

  // Successful login
  rep.status(200).send({ token } as LoginReply200);
  return;
};

export default routeLogin;
