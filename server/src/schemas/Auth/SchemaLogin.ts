// Imports
import { FastifySchema } from "fastify";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginReply200 {
  token: string;
}

export interface LoginReplyError {
  message: string;
}

const schemaLogin: FastifySchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export default schemaLogin;
