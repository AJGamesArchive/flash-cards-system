// Imports
import { FastifySchema } from "fastify";

export interface GETSetsReply200 {
  setDetails: {
    setUUID: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    authorUUID: string;
  },
  reviews: {
    reviewUUID: string;
    review: string;
    starRating: number;
    reviewDate: string;
    authorUUID: string;
    setUUID: string;
  }[],
};

const schemaGETSets: FastifySchema = {
  response: {
    200: {
      type: "array",
      items: {
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
          },
          reviews: {
            type: "array",
            items: {
              type: "object",
              properties: {
                reviewUUID: { type: "string" },
                review: { type: "string" },
                starRating: { type: "number" },
                reviewDate: { type: "string", format: "date-time" },
                authorUUID: { type: "string" },
                setUUID: { type: "string" },
              },
            },
          },
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
    },
  },
};

export default schemaGETSets;
