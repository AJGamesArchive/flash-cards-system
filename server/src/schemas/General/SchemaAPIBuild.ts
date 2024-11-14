// Imports
import { FastifySchema } from "fastify";

export interface APIBuildReply {
  version: string;
}

const schemaAPIBuild: FastifySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        version: { type: "string" },
      },
    },
  },
};

export default schemaAPIBuild;
