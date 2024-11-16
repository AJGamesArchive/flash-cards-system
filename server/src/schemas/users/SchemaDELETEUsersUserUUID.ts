// Imports
import { FastifySchema } from "fastify";

export interface DELETEUsersUserUUIDParams {
  userUUID: string;
};

export interface DELETEUsersUserUUIDReplyError {
  message: string;
};

const schemaDELETEUsersUserUUID: FastifySchema = {
  params: {
    type: "object",
    properties: {
      userUUID: { type: "string" },
    },
    required: ["userUUID"],
  },
  response: {
    204: {},
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    403: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    404: {
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

export default schemaDELETEUsersUserUUID;
