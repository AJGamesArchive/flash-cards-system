// Imports
import { FastifySchema } from "fastify";

export interface GETSetsSetUUIDReviewsParams {
  setUUID: string;
};

export interface GETSetsSetUUIDReviewsReply201 {
  reviewUUID: string;
  review: string;
  starRating: number;
  reviewDate: string;
  updatedAt: string;
  authorUUID: string | null;
  setUUID: string;
};

export interface GETSetsSetUUIDReviewsReplyError {
  message: string;
};

const schemaGETSetsSetUUIDReviews: FastifySchema = {
  params: {
    type: "object",
    properties: {
      setUUID: { type: "string" },
    },
    required: ["setUUID"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          reviewUUID: { type: "string" },
          review: { type: "string" },
          starRating: { type: "number" },
          reviewDate: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          authorUUID: {
            type: ["string", "null"],
          },
          authorUsername: {
            type: ["string", "null"],
          },
          setUUID: { type: "string" },
        },
        required: [
          "reviewUUID",
          "review",
          "starRating",
          "reviewDate",
          "authorUUID",
          "authorUsername",
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

export default schemaGETSetsSetUUIDReviews;
