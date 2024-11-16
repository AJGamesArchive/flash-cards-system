// Imports
import { FastifySchema } from "fastify";
import { DifficultyOptions } from "../../types/Difficulty.js";

export interface PUTSetsSetUUIDParams {
  setUUID: string;
};

export interface PUTSetsSetUUIDRequest {
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
    difficulty: DifficultyOptions | null;
    createdAt: string;
    updateAt: string;
    setUUID: string;
  }[],
};

export interface PUTSetsSetUUIDReply200 {
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
    difficulty: DifficultyOptions | null;
    createdAt: string;
    updateAt: string;
    setUUID: string;
  }[],
};

export interface PUTSetsSetUUIDReplyError {
  message: string;
};

const schemaPUTSetsSetUUID: FastifySchema = {
  params: {
    type: "object",
    properties: {
      setUUID: { type: "string" },
    },
    required: ["setUUID"],
  },
  body: {
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
      },
      required: [
        "setDetails",
        "flashCards",
      ],
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
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

export default schemaPUTSetsSetUUID;
