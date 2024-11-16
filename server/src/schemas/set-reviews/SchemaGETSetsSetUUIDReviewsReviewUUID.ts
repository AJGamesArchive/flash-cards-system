// Imports
import { FastifySchema } from "fastify";

export interface GETSetsSetUUIDReviewsReviewUUIDParams {
  setUUID: string;
  reviewUUID: string;
};

export interface GETSetsSetUUIDReviewsReviewUUIDReply200{
  reviewUUID: string;
  review: string;
  starRating: number;
  reviewDate: string;
  updatedAt: string;
  authorUUID: string | null;
  authorUsername: string | null;
  setUUID: string;
};

export interface GETSetsSetUUIDReviewsReviewUUIDReplyError {
  message: string;
};

const schemaGETSetsSetUUIDReviewsReviewUUID: FastifySchema = {
  params: {
    type: "object",
    properties: {
      setUUID: { type: "string" },
      reviewUUID: { type: "string" },
    },
    required: ["setUUID", "reviewUUID"],
  },
  response: {
    200: {
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
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export default schemaGETSetsSetUUIDReviewsReviewUUID;
