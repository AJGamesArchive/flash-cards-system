// Imports
import { FastifySchema } from "fastify";

export interface DELETEHiddenCardsUserUUIDParams {
  userUUID: string;
};

export interface DELETEHiddenCardsUserUUIDRequest {
  cardUUID: string;
};

export interface DELETEHiddenCardsUserUUIDReplyError {
  message: string;
};

const schemaDELETEHiddenCardsUserUUID: FastifySchema = {
  params: {
    type: "object",
    properties: {
      userUUID: { type: "string" },
    },
    required: ["userUUID"],
  },
  body: {
    type: "object",
    properties: {
      cardUUID: { type: "string" },
    },
    required: ["cardUUID"],
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

export default schemaDELETEHiddenCardsUserUUID;
