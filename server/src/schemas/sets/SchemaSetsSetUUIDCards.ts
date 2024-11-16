// Imports
import { FastifySchema } from "fastify";
import { DifficultyOptions } from "../../types/Difficulty.js";

export interface SetsSetUUIDCardsParams {
  setUUID: string;
};

export interface SetsSetUUIDCardsQuery {
  shuffle?: boolean;
};

export interface SetsSetUUIDCardsReply200 {
  cardUUID: string;
  question: string;
  answer: string;
  difficulty: DifficultyOptions | null;
  createdAt: string;
  updateAt: string;
  setUUID: string;
};

export interface SetsSetUUIDCardsReplyError {
  message: string;
};

const schemaSetsSetUUIDCards: FastifySchema = {
  params: {
    type: "object",
    properties: {
      setUUID: { type: "string" },
    },
    required: ["setUUID"],
  },
  querystring: {
    type: "object",
    properties: {
      shuffle: { type: "boolean" },
    },
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          cardUUID: { type: "string" },
          question: { type: "string" },
          answer: { type: "string" },
          difficulty: {
            type: ["string", "null"],
            enum: ["Easy", "Medium", "Hard", null]
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          setUUID: { type: "string" },
        },
        required: [
          "cardUUID",
          "question",
          "answer",
          "difficulty",
          "createdAt",
          "updatedAt",
          "setUUID",
        ],
      },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export default schemaSetsSetUUIDCards;
