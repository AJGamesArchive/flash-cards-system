// Imports
import { FastifySchema } from "fastify";

export interface GETSetsReply200 {
  setUUID: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorUUID: string;
  authorUsername: string;
  numReviews: number;
  numFlashcards: number;
};

const schemaGETSets: FastifySchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          setUUID: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          authorUUID: { type: "string" },
          authorUsername: { type: "string" },
          numReviews: { type: "number" },
          numFlashcards: { type: "string" },
        },
        required: [
          "setUUID",
          "name",
          "description",
          "createdAt",
          "updatedAt",
          "authorUUID",
          "authorUsername",
          "numReviews",
          "numFlashcards",
        ],
      },
    },
  },
};

export default schemaGETSets;
