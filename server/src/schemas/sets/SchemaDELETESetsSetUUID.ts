// Imports
import { FastifySchema } from "fastify";

export interface DELETESetsSetUUIDParams {
  setUUID: string;
};

export interface DELETESetsSetUUIDReplyError {
  message: string;
};

const schemaDELETESetsSetUUID: FastifySchema = {
  params: {
    type: "object",
    properties: {
      setUUID: { type: "string" },
    },
    required: ["setUUID"],
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

export default schemaDELETESetsSetUUID;
