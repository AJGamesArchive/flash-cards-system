// Imports
import { FastifySchema } from "fastify";

export interface POSTHiddenCardsUserUUIDParams {
  userUUID: string;
};

export interface POSTHiddenCardsUserUUIDRequest {
  cardUUID: string;
};

export interface POSTHiddenCardsUserUUIDReply201 {
  allocationUUID: string;
  userUUID: string;
  cardUUID: string;
};

export interface POSTHiddenCardsUserUUIDReplyError {
  message: string;
};

const schemaPOSTHiddenCardsUserUUID: FastifySchema = {
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
    201: {
      type: "object",
      properties: {
        allocationUUID: { type: "string" },
        userUUID: { type: "string" },
        cardUUID: { type: "string" },
      },
      required: [
        "allocationUUID",
        "userUUID",
        "cardUUID",
      ],
    },
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

export default schemaPOSTHiddenCardsUserUUID;
