// Imports
import { FastifySchema } from "fastify";

export interface POSTSetsSetUUIDReviewParams {
  setUUID: string;
};

export interface POSTSetsSetUUIDReviewRequest {
  review: string;
  starRating: number;
};

export interface POSTSetsSetUUIDReviewReply201 {
  reviewUUID: string;
  review: string;
  starRating: number;
  reviewDate: string;
  updatedAt: string;
  authorUUID: string | null;
  setUUID: string;
};

export interface POSTSetsSetUUIDReviewReplyError {
  message: string;
};

const schemaPOSTSetsSetUUIDReview: FastifySchema = {
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
      review: { type: "string" },
      starRating: { type: "number" },
    },
    required: ["review", "starRating"],
  },
  response: {
    201: {
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
        setUUID: { type: "string" },
      },
      required: [
        "reviewUUID",
        "review",
        "starRating",
        "reviewDate",
        "authorUUID",
        "setUUID",
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
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export default schemaPOSTSetsSetUUIDReview;
