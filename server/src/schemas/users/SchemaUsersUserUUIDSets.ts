// Imports
import { FastifySchema } from "fastify";

export interface UserUserUUIDSetsParams {
  userUUID: string;
};

export interface UserUserUUIDSetsReply200 {
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
    authorUUID: string | null;
    setUUID: string;
  }[],
};

export interface UsersUserUUIDSetsReplyError {
  message: string;
};

const schemaUsersUserUUIDSets: FastifySchema = {
  params: {
    type: "object",
    properties: {
      userUUID: { type: "string" },
    },
    required: ["userUUID"],
  },
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
            required: [
              "setUUID",
              "name",
              "description",
              "createdAt",
              "updatedAt",
              "authorUUID",
            ],
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
          },
        },
        required: [
          "setDetails",
          "reviews",
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

export default schemaUsersUserUUIDSets;
