// Imports
import { FastifySchema } from "fastify";

export interface DELETEUsersUserUUIDCollectionsCollectionUUIDParams {
  userUUID: string;
  collectionUUID: string;
};

export interface DELETEUsersUserUUIDCollectionsCollectionUUIDReplyError {
  message: string;
};

const schemaDELETEUsersUserUUIDCollectionsCollectionUUID: FastifySchema = {
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

export default schemaDELETEUsersUserUUIDCollectionsCollectionUUID;
