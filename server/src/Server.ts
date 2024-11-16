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
import routeGETSetSetUUID from "./routes/sets/RouteGETSetsSetUUID.js";
import schemaGETSetsSetUUID from "./schemas/sets/SchemaGETSetsSetUUID.js";
import routePUTSetsSetUUID from "./routes/sets/RoutePUTSetsSetUUID.js";
import schemaPUTSetsSetUUID, { PUTSetsSetUUIDRequest, PUTSetsSetUUIDParams } from "./schemas/sets/SchemaPUTSetsSetUUID.js";
import routeDELETESetsSetUUID from "./routes/sets/RouteDELETESetsSetUUID.js";
import schemaDELETESetsSetUUID, { DELETESetsSetUUIDParams } from "./schemas/sets/SchemaDELETESetsSetUUID.js";
import routeSetsSetUUIDCards from "./routes/sets/RouteSetsSetUUIDCards.js";
import schemaSetsSetUUIDCards from "./schemas/sets/SchemaSetsSetUUIDCards.js";

// Set review routes & schemas
import routePOSTSetSetUUIDReview from "./routes/set-reviews/RoutePOSTSetsSetUUIDReview.js";
import schemaPOSTSetsSetUUIDReview, { POSTSetsSetUUIDReviewParams, POSTSetsSetUUIDReviewRequest } from "./schemas/set-reviews/SchemaPOSTSetsSetUUIDReview.js";
import routeGETSetSetUUIDReviews from "./routes/set-reviews/RouteGETSetsSetUUIDReviews.js";
import schemaGETSetsSetUUIDReviews from "./schemas/set-reviews/SchemaGETSetsSetUUIDReviews.js";
import routeGETSetSetUUIDReviewsReviewUUID from "./routes/set-reviews/RouteGETSetsSetUUIDReviewsReviewUUID.js";
import schemaGETSetsSetUUIDReviewsReviewUUID from "./schemas/set-reviews/SchemaGETSetsSetUUIDReviewsReviewUUID.js";
import routeGETSetSetUUIDReviewsAuthorUUID from "./routes/set-reviews/RouteGETSetsSetUUIDReviewsAuthorUUID.js";
import schemaGETSetsSetUUIDReviewsAuthorUUID from "./schemas/set-reviews/SchemaGETSetsSetUUIDReviewsAuthorUUID.js";

// User routes & schemas
import routeGETUsers from "./routes/users/RouteGETUsers.js";
import schemaGETUsers from "./schemas/users/SchemaGETUsers.js";
import routeGETUsersUserUUID from "./routes/users/RouteGETUsersUserUUID.js";
import schemaGETUsersUserUUID, { GETUsersUserUUIDParams } from "./schemas/users/SchemaGETUsersUserUUID.js";
import routeUsersUserUUIDSets from "./routes/users/RouteUsersUserUUIDSets.js";
import schemaUsersUserUUIDSets from "./schemas/users/SchemaUsersUserUUIDSets.js";

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
//TODO Update system to allow sets to be marks as 'Public' or 'Private' by users if time permits

// General endpoints
server.get("/", {
  schema: schemaAPIBuild,
}, routeAPIBuild);

// Auth endpoints
server.post("/login", {
  schema: schemaLogin,
}, routeLogin);
server.get("/confirmLogin", {
  schema: schemaConfirmLogin,
}, routeConfirmLogin);
server.delete('/logout', {
  schema: schemaLogout,
  preHandler: [guardAuthenticate<any, any, any>],
}, routeLogout);

// Flashcard set endpoints
server.get('/sets', {
  schema: schemaGETSets,
}, routeGETSets);
server.post('/sets', {
  schema: schemaPOSTSets,
  preHandler: [guardAuthenticate<POSTSetsRequest, any, any>],
}, routePOSTSets);
server.get('/sets/:setUUID', {
  schema: schemaGETSetsSetUUID,
}, routeGETSetSetUUID);
server.put('/sets/:setUUID', {
  schema: schemaPUTSetsSetUUID,
  preHandler: [guardAuthenticate<PUTSetsSetUUIDRequest, PUTSetsSetUUIDParams, any>],
}, routePUTSetsSetUUID);
server.delete('/sets/:setUUID', {
  schema: schemaDELETESetsSetUUID,
  preHandler: [guardAuthenticate<any, DELETESetsSetUUIDParams, any>],
}, routeDELETESetsSetUUID);
server.get('/sets/:setUUID/cards', {
  schema: schemaSetsSetUUIDCards,
}, routeSetsSetUUIDCards);

// Set review endpoints
server.post('/sets/:setUUID/review', {
  schema: schemaPOSTSetsSetUUIDReview,
  preHandler: [guardAuthenticate<POSTSetsSetUUIDReviewRequest, POSTSetsSetUUIDReviewParams, any>],
}, routePOSTSetSetUUIDReview);
server.get('/sets/:setUUID/reviews', {
  schema: schemaGETSetsSetUUIDReviews,
}, routeGETSetSetUUIDReviews);
server.get('/sets/:setUUID/reviews/:reviewUUID', {
  schema: schemaGETSetsSetUUIDReviewsReviewUUID,
}, routeGETSetSetUUIDReviewsReviewUUID);
server.get('/sets/:setUUID/reviews/:authorUUID', {
  schema: schemaGETSetsSetUUIDReviewsAuthorUUID,
}, routeGETSetSetUUIDReviewsAuthorUUID);

// User endpoints
server.get('/users', {
  schema: schemaGETUsers,
  preHandler: [guardAuthenticate<any, any, any>, guardIsAdmin<any, any, any>],
}, routeGETUsers);
server.get('/users/:userUUID', {
  schema: schemaGETUsersUserUUID,
  preHandler: [guardAuthenticate<any, GETUsersUserUUIDParams, any>],
}, routeGETUsersUserUUID);
server.get('/users/:userUUID/sets', {
  schema: schemaUsersUserUUIDSets,
}, routeUsersUserUUIDSets);

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
