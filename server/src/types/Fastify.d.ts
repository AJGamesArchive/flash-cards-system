// Import fastify
import 'fastify';

// Extend fastify's FastifyRequest type to define the 'user' prop
declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      username: string;
      uuid: string;
      isAdmin: boolean;
      int?: number;
      exp?: number;
    };
  };
};