// Imports
import { FastifySchema } from "fastify";

export interface DELETEUserCollectionSetAllocationsParams {
  userUUID: string;
  collectionUUID: string;
  setUUID: string;
};

export interface DELETEUserCollectionSetAllocationsReplyError {
  message: string;
};

const schemaDELETEUserCollectionSetAllocation: FastifySchema = {
  params: {
    type: "object",
    properties: {
      userUUID: { type: "string" },
      collectionUUID: { type: "string" },
      setUUID: { type: "string" },
    },
    required: [
      "userUUID",
      "collectionUUID",
      "setUUID",
    ],
  },
  response: {
    204: {},
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

export default schemaDELETEUserCollectionSetAllocation;
