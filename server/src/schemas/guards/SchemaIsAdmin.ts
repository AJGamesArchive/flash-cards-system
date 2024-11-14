// Imports
import { FastifySchema } from "fastify";

export interface IsAdminReplyError {
  message: string;
}

const schemaIsAdmin: FastifySchema = {
  response: {
    403: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export default schemaIsAdmin;
