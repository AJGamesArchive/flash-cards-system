// Imports
import { FastifySchema } from "fastify";

export interface PATCHUsersUserUUIDParams {
  userUUID: string;
};

export interface PATCHUsersUserUUIDRequest {
  username: string;
  adminFlag: boolean;
};

export interface PATCHUsersUserUUIDReply200 {
  userUUID: string;
  username: string;
  adminFlag: boolean;
  userSince: string;
  deleted: boolean;
  apiAccount: boolean;
};

export interface PATCHUsersUserUUIDReplyError {
  message: string;
};

const schemaPATCHUsersUserUUID: FastifySchema = {
  params: {
    type: "object",
    properties: {
      userUUID: { type: "string" },
    },
    required: ["userUUID"],
  },
  body: {
    type: "object",
    properties: {
      username: { type: "string" },
      adminFlag: { type: "boolean" },
    },
    required: [
      "username",
      "adminFlag",
    ],
  },
  response: {
    200: {
      type: "object",
      properties: {
        userUUID: { type: "string" },
        username: { type: "string" },
        adminFlag: { type: "boolean" },
        userSince: { type: "string", format: "date-time" },
        deleted: { type: "boolean" },
        apiAccount: { type: "boolean" },
      },
      required: [
        "userUUID",
        "username",
        "adminFlag",
        "userSince",
        "deleted",
        "apiAccount",
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

export default schemaPATCHUsersUserUUID;
