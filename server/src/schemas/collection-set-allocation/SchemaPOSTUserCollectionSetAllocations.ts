// Imports
import { FastifySchema } from "fastify";

export interface POSTUserCollectionSetAllocationsParams {
  userUUID: string;
  collectionUUID: string;
};

export interface POSTUserCollectionSetAllocationsRequest {
  setUUID: string;
};

export interface POSTUserCollectionSetAllocationsReply201 {
  setUUID: string;
  collectionUUID: string;
};

export interface POSTUserCollectionSetAllocationsReplyError {
  message: string;
};

const schemaPOSTUserCollectionSetAllocation: FastifySchema = {
  params: {
    type: "object",
    properties: {
      userUUID: { type: "string" },
      collectionUUID: { type: "string" },
    },
    required: [
      "userUUID",
      "collectionUUID",
    ],
  },
  body: {
    type: "object",
    properties: {
      setUUID: { type: "string" },
    },
    required: [
      "setUUID",
    ],
  },
  response: {
    201: {
      type: "object",
      properties: {
        setUUID: { type: "string" },
        collectionUUID: { type: "string" },
      },
      required: [
        "setUUID",
        "collectionUUID",
      ],
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

export default schemaPOSTUserCollectionSetAllocation;
