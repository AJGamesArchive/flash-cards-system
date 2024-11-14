// Core Imports
import fastifyJWT from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import Fastify from "fastify";

// Guard functions
import guardAuthenticate from "./routes/guards/GuardIsAuthenticated.js";
import guardIsAdmin from "./routes/guards/GuardIsAdmin.js";

// General routes & schemas
import routeAPIBuild from "./routes/general/RouteAPIBuild.js";
import schemaAPIBuild from "./schemas/general/SchemaAPIBuild.js";

// Auth routes & schemas
import routeLogin from "./routes/auth/RouteLogin.js";
import schemaLogin from "./schemas/auth/SchemaLogin.js";
import routeConfirmLogin from "./routes/auth/RouteConfirmLogin.js";
import schemaConfirmLogin from "./schemas/auth/SchemaConfirmLogin.js";
import routeLogout from "./routes/auth/RouteLogout.js";
import schemaLogout from "./schemas/auth/SchemaLogout.js";

// Flashcard set routes & schemas
import routeGETSets from "./routes/sets/RouteGETSets.js";
import schemaGETSets from "./schemas/sets/SchemaGETSets.js";
import routePOSTSets from "./routes/sets/RoutePOSTSets.js";
import schemaPOSTSets, { POSTSetsRequest } from "./schemas/sets/SchemaPOSTSets.js";

// Load ENVs
dotenv.config();

// Create API & Database Connection
const server = Fastify({ logger: true }); //TODO Disable logger for production
export const db = new PrismaClient();

// Setup Fastify JWT & corresponding secret
const jwtSecret: string | undefined = process.env.JWT_SECRET;
if(!jwtSecret) {
  console.error('Failed to load JWT secret ENV.');
  db.$disconnect();
  process.exit(1);
};
server.register(fastifyJWT, { secret: jwtSecret });

// Route guards
server.decorate("/authenticate", guardAuthenticate); //! Remove later if still unused
server.decorate("/isAdmin", guardIsAdmin); //! Remove later if still unused

//TODO Update all endpoints to use errorHandler functions to clean up error hading if time permits

// General endpoints
server.get("/", { schema: schemaAPIBuild }, routeAPIBuild);

// Auth endpoints
server.post("/login", { schema: schemaLogin }, routeLogin);
server.get("/confirmLogin", { schema: schemaConfirmLogin }, routeConfirmLogin);
server.delete('/logout', { schema: schemaLogout, preHandler: [guardAuthenticate<any>] }, routeLogout);

// Flashcard set endpoints
server.get('/sets', { schema: schemaGETSets }, routeGETSets);
server.post('/sets', { schema: schemaPOSTSets, preHandler: [guardAuthenticate<POSTSetsRequest>] }, routePOSTSets);

// // Endpoint to test adding database data
// server.post('/addUser', async (req: FastifyRequest, rep: FastifyReply) => {
//   try {
//     const user = req.body as {
//       userUUID: string;
//       username: string;
//       password: string;
//       adminFlag: boolean;
//     };
//     const dbUser = await db.users.create({ data: user });
//     rep.status(201).send(dbUser);
//     return;
//   } catch (error: any) {
//     rep.status(500).send({ message: 'Internal Server Error' });
//     return;
//   };
// });

// // Endpoint to test fetching database data
// server.get('/getUsers', async (req: FastifyRequest, rep: FastifyReply) => {
//   console.log(req);
//   const users = await db.users.findMany();
//   rep.status(200).send(users);
//   return;
// });

// // Endpoint to test hashing
// server.post('/hash', async (req: FastifyRequest, rep: FastifyReply) => {
//   const string = req.body as {
//     string: string;
//   };
//   const hashedString: string = await bcrypt.hash(string.string, 10);
//   rep.status(201).send({ hashedString: hashedString });
//   return;
// });

// Start server
server.listen(
  { port: 80, host: "0.0.0.0" },
  (error: Error | null, address: string) => {
    if (error) {
      server.log.error(error);
      db.$disconnect();
      process.exit(1);
    };
    console.log(`API ready on: ${address}`);
  },
);

// Listen for process termination signals to close the server
process.on("SIGTERM", () => {
  server.close().then(async () => {
    console.log("Server closed!");
    await db.$disconnect();
    process.exit(0);
  });
});
process.on("SIGINT", () => {
  server.close().then(async () => {
    console.log("Server closed!");
    await db.$disconnect();
    process.exit(0);
  });
});

// Export server object for use in testing
export default server;
