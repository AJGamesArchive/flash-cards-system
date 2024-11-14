// Imports
import { FastifySchema } from "fastify";
import Difficulty from "../../types/Difficulty.js";

export interface POSTSetsRequest {
  setDetails: {
    name: string;
    description: string;
    authorUUID?: string;
  },
  flashCards: {
    question: string;
    answer: string;
    difficulty: Difficulty;
  }[],
};

export interface POSTSetsReply201 {
  setDetails: {
    setUUID: string;
    name: string;
    description: string;
    createdAt: string;
    updateAt: string;
    authorUUID: string;
  },
  flashCards: {
    cardUUID: string;
    question: string;
    answer: string;
    difficulty: Difficulty;
    createdAt: string;
    updateAt: string;
    setUUID: string;
  }[],
};

export interface POSTSetsReplyError {
  message: string;
};

const schemaPOSTSets: FastifySchema = {
  body: {
    type: "object",
    properties: {
      setDetails: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          authorUUID: { type: "string" },
        },
        required: [
          "name",
          "description",
        ],
      },
      flashCards: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" },
            difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
          },
          required: [
            "question",
            "answer",
            "difficulty"
          ],
        },
      },
    },
    required: [
      "setDetails",
      "flashCards",
    ],
  },
  response: {
    201: {
      type: "object",
      properties: {
        setDetails: {
          type: "object",
          properties: {
            setUUID: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            authorUUID: { type: "string" },
          },
          required: [
            "setUUID",
            "name",
            "description",
            "createdAt",
            "updatedAt",
            "authorUUID",
          ],
        },
        flashCards: {
          type: "array",
          items: {
            type: "object",
            properties: {
              cardUUID: { type: "string" },
              question: { type: "string" },
              answer: { type: "string" },
              difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
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
      },
      required: [
        "setDetails",
        "flashCards",
      ],
    },
    401: {
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
    429: {
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

export default schemaPOSTSets;
