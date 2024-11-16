// Imports
import { FastifySchema } from "fastify";

export interface GETUsersReply200 {
  userUUID: string;
  username: string;
  adminFlag: boolean;
  userSince: string;
  deleted: boolean;
  apiAccount: boolean;
};

const schemaGETUsers: FastifySchema = {
  response: {
    200: {
      type: "array",
      items: {
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
  },
};

export default schemaGETUsers;
