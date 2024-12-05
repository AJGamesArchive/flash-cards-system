// Core Imports
import cors from '@fastify/cors';
import fastifyJWT from '@fastify/jwt';
import swagger from '@fastify/swagger';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import routeConfirmLogin from './routes/auth/RouteConfirmLogin.js';
import routeLogin from './routes/auth/RouteLogin.js';
import routeLogout from './routes/auth/RouteLogout.js';
import routeDELETEUserCollectionSetAllocations from './routes/collection-set-allocation/RouteDELETEUserCollectionSetAllocations.js';
import routeGETUserCollectionSetAllocations from './routes/collection-set-allocation/RouteGETUserCollectionSetAllocations.js';
import routePOSTUserCollectionSetAllocations from './routes/collection-set-allocation/RoutePOSTUserCollectionSetAllocations.js';
import routeDELETEUsersUserUUIDCollectionsCollectionUUID from './routes/collections/RouteDELETEUsersUserUUIDCollectionsCollectionUUID.js';
import routeGETCollections from './routes/collections/RouteGETCollections.js';
import routeGETUsersUserUUIDCollections from './routes/collections/RouteGETUsersUserUUIDCollections.js';
import routeGETUsersUserUUIDCollectionsCollectionUUID from './routes/collections/RouteGETUsersUserUUIDCollectionsCollectionUUID.js';
import routePATCHUsersUserUUIDCollectionsCollectionUUID from './routes/collections/RoutePATCHUsersUserUUIDCollectionsCollectionUUID.js';
import routePOSTUsersUserUUIDCollections from './routes/collections/RoutePOSTUsersUserUUIDCollections.js';
import routePOSTFlashcardsCardUUIDlog from './routes/flashcard-logs/RoutePOSTFlashcardCardUUIDLog.ts.js';
import routeAPIBuild from './routes/general/RouteAPIBuild.js';
import guardIsAdmin from './routes/guards/GuardIsAdmin.js';
import guardAuthenticate from './routes/guards/GuardIsAuthenticated.js';
import routeDELETEHiddenCardUserUUID from './routes/hidden-card-allocations/RouteDELETEHiddenCardsUserUUID.js';
import routeGETHiddenCardUserUUID from './routes/hidden-card-allocations/RouteGETHiddenCardsUserUUID.js';
import routePOSTHiddenCardUserUUID from './routes/hidden-card-allocations/RoutePOSTHiddenCardsUserUUID.js';
import routeGETSetSetUUIDReviews from './routes/set-reviews/RouteGETSetsSetUUIDReviews.js';
import routeGETSetSetUUIDReviewsAuthorUUID from './routes/set-reviews/RouteGETSetsSetUUIDReviewsAuthorUUID.js';
import routeGETSetSetUUIDReviewsReviewUUID from './routes/set-reviews/RouteGETSetsSetUUIDReviewsReviewUUID.js';
import routePOSTSetSetUUIDReview from './routes/set-reviews/RoutePOSTSetsSetUUIDReview.js';
import routeDELETESetsSetUUID from './routes/sets/RouteDELETESetsSetUUID.js';
import routeGETSets from './routes/sets/RouteGETSets.js';
import routeGETSetSetUUID from './routes/sets/RouteGETSetsSetUUID.js';
import routePOSTSets from './routes/sets/RoutePOSTSets.js';
import routePUTSetsSetUUID from './routes/sets/RoutePUTSetsSetUUID.js';
import routeSetsSetUUIDCards from './routes/sets/RouteSetsSetUUIDCards.js';
import routeDELETECreationCounter from './routes/system-config/RouteDELETECreationCounter.js';
import routeGETSetCreationLimit from './routes/system-config/RouteGETSetCreationLimit.js';
import routePATCHSetCreationLimit from './routes/system-config/RoutePATCHSetCreationLimit.js';
import routeDELETEUsersUserUUID from './routes/users/RouteDELETEUsersUserUUID.js';
import routeGETUsers from './routes/users/RouteGETUsers.js';
import routeGETUsersUserUUID from './routes/users/RouteGETUsersUserUUID.js';
import routePATCHUsersUserUUID from './routes/users/RoutePATCHUsersUserUUID.js';
import routePATCHUsersUserUUIDPassword from './routes/users/RoutePATCHUsersUserUUIDPassword.js';
import routePOSTUsers from './routes/users/RoutePOSTUsers.js';
import routeUsersUserUUIDSets from './routes/users/RouteUsersUserUUIDSets.js';
import schemaConfirmLogin from './schemas/auth/SchemaConfirmLogin.js';
import schemaLogin from './schemas/auth/SchemaLogin.js';
import schemaLogout from './schemas/auth/SchemaLogout.js';
import schemaDELETEUserCollectionSetAllocation, {
	DELETEUserCollectionSetAllocationsParams,
} from './schemas/collection-set-allocation/SchemaDELETEUserCollectionSetAllocations.js';
import schemaGETUserCollectionSetAllocations, {
	GETUserCollectionSetAllocationsParams,
} from './schemas/collection-set-allocation/SchemaGETUserCollectionSetAllocations.js';
import schemaPOSTUserCollectionSetAllocation, {
	POSTUserCollectionSetAllocationsParams,
	POSTUserCollectionSetAllocationsRequest,
} from './schemas/collection-set-allocation/SchemaPOSTUserCollectionSetAllocations.js';
import schemaDELETEUsersUserUUIDCollectionsCollectionUUID, {
	DELETEUsersUserUUIDCollectionsCollectionUUIDParams,
} from './schemas/collections/SchemaDELETEUsersUserUUIDCollectionsCollectionUUID.js';
import schemaGETCollections from './schemas/collections/SchemaGETCollections.js';
import schemaGETUsersUserUUIDCollections, {
	GETUsersUserUUIDCollectionsParams,
	GETUsersUserUUIDCollectionsQuery,
} from './schemas/collections/SchemaGETUsersUserUUIDCollections.js';
import schemaGETUsersUserUUIDCollectionsCollectionUUID, {
	GETUsersUserUUIDCollectionsCollectionUUIDParams,
} from './schemas/collections/SchemaGETUsersUserUUIDCollectionsCollectionUUID.js';
import schemaPATCHUsersUserUUIDCollectionsCollectionUUID, {
	PATCHUsersUserUUIDCollectionsCollectionUUIDParams,
	PATCHUsersUserUUIDCollectionsCollectionUUIDRequest,
} from './schemas/collections/SchemaPATCHUsersUserUUIDCollectionsCollectionUUID.js';
import schemaPOSTUsersUserUUIDCollections, {
	POSTUsersUserUUIDCollectionsParams,
	POSTUsersUserUUIDCollectionsRequest,
} from './schemas/collections/SchemaPOSTUsersUserUUIDCollections.js';
import schemaPOSTFlashcardCardUUIDLog, {
	POSTFlashcardCardUUIDLogRequest,
} from './schemas/flashcard-logs/SchemaPOSTFlashcardCardUUIDLog.js';
import schemaAPIBuild from './schemas/general/SchemaAPIBuild.js';
import schemaDELETEHiddenCardsUserUUID, {
	DELETEHiddenCardsUserUUIDParams,
} from './schemas/hidden-card-allocations/SchemaDELETEHiddenCardsUserUUID.js';
import schemaGETHiddenCardsUserUUID from './schemas/hidden-card-allocations/SchemaGETHiddenCardsUserUUID.js';
import schemaPOSTHiddenCardsUserUUID, {
	POSTHiddenCardsUserUUIDParams,
	POSTHiddenCardsUserUUIDRequest,
} from './schemas/hidden-card-allocations/SchemaPOSTHiddenCardsUserUUID.js';
import schemaGETSetsSetUUIDReviews from './schemas/set-reviews/SchemaGETSetsSetUUIDReviews.js';
import schemaGETSetsSetUUIDReviewsAuthorUUID from './schemas/set-reviews/SchemaGETSetsSetUUIDReviewsAuthorUUID.js';
import schemaGETSetsSetUUIDReviewsReviewUUID from './schemas/set-reviews/SchemaGETSetsSetUUIDReviewsReviewUUID.js';
import schemaPOSTSetsSetUUIDReview, {
	POSTSetsSetUUIDReviewParams,
	POSTSetsSetUUIDReviewRequest,
} from './schemas/set-reviews/SchemaPOSTSetsSetUUIDReview.js';
import schemaDELETESetsSetUUID, {
	DELETESetsSetUUIDParams,
} from './schemas/sets/SchemaDELETESetsSetUUID.js';
import schemaGETSets from './schemas/sets/SchemaGETSets.js';
import schemaGETSetsSetUUID from './schemas/sets/SchemaGETSetsSetUUID.js';
import schemaPOSTSets, {
	POSTSetsRequest,
} from './schemas/sets/SchemaPOSTSets.js';
import schemaPUTSetsSetUUID, {
	PUTSetsSetUUIDRequest,
	PUTSetsSetUUIDParams,
} from './schemas/sets/SchemaPUTSetsSetUUID.js';
import schemaSetsSetUUIDCards from './schemas/sets/SchemaSetsSetUUIDCards.js';
import schemaDELETECreationCounter from './schemas/system-config/SchemaDELETECreationCounter.js';
import schemaGETSetCreationLimit from './schemas/system-config/SchemaGETSetCreationLimit.js';
import schemaPATCHSetCreationLimit, {
	PATCHSetCreationLimitRequestBody,
} from './schemas/system-config/SchemaPATCHSetCreationLimit.js';
import schemaDELETEUsersUserUUID, {
	DELETEUsersUserUUIDParams,
} from './schemas/users/SchemaDELETEUsersUserUUID.js';
import schemaGETUsers from './schemas/users/SchemaGETUsers.js';
import schemaGETUsersUserUUID, {
	GETUsersUserUUIDParams,
} from './schemas/users/SchemaGETUsersUserUUID.js';
import schemaPATCHUsersUserUUID, {
	PATCHUsersUserUUIDParams,
	PATCHUsersUserUUIDRequest,
} from './schemas/users/SchemaPATCHUsersUserUUID.js';
import schemaPATCHUsersUserUUIDPassword, {
	PATCHUsersUserUUIDPasswordParams,
	PATCHUsersUserUUIDPasswordRequest,
} from './schemas/users/SchemaPATCHUsersUserUUIDPassword.js';
import schemaPOSTUsers from './schemas/users/SchemaPOSTUsers.js';
import schemaUsersUserUUIDSets from './schemas/users/SchemaUsersUserUUIDSets.js';

// Create API & Database Connection
const server = Fastify({ logger: true }); //TODO Disable logger for production
export const db = new PrismaClient();

// Load ENVs
dotenv.config();
const port: number = parseInt(process.env.PORT, 10);
if (isNaN(port)) {
	console.error('Failed to load PORT ENV.');
	db.$disconnect();
	process.exit(1);
}
const jwtSecret: string = process.env.JWT_SECRET;
if (!jwtSecret) {
	console.error('Failed to load JWT_SECRET ENV.');
	db.$disconnect();
	process.exit(1);
}

// Setup Fastify Plugins
server.register(cors, {
	origin: '*', // Allow all origins, exposing API
});
server.register(fastifyJWT, { secret: jwtSecret });
server.register(swagger, {
	swagger: {
		info: {
			title: 'TestVar - Flashcards API',
			description: 'A revolutionary REST API for flashcards',
			version: '1.0.0',
		},
	},
});

//TODO Update all endpoints to use errorHandler functions to clean up error hading if time permits
//TODO Update system to allow sets to be marks as 'Public' or 'Private' by users if time permits
//TODO Update endpoint handler functions to be within an overall timeout function if time permits

// General endpoints
server.get(
	'/',
	{
		schema: schemaAPIBuild,
	},
	routeAPIBuild,
);

// Auth endpoints
server.post(
	'/login',
	{
		schema: schemaLogin,
	},
	routeLogin,
);
server.get(
	'/confirmLogin',
	{
		schema: schemaConfirmLogin,
	},
	routeConfirmLogin,
);
server.delete(
	'/logout',
	{
		schema: schemaLogout,
		preHandler: [guardAuthenticate<any, any, any>],
	},
	routeLogout,
);

// Flashcard set endpoints
server.get(
	'/sets',
	{
		schema: schemaGETSets,
	},
	routeGETSets,
);
server.post(
	'/sets',
	{
		schema: schemaPOSTSets,
		preHandler: [guardAuthenticate<POSTSetsRequest, any, any>],
	},
	routePOSTSets,
);
server.get(
	'/sets/:setUUID',
	{
		schema: schemaGETSetsSetUUID,
	},
	routeGETSetSetUUID,
);
server.put(
	'/sets/:setUUID',
	{
		schema: schemaPUTSetsSetUUID,
		preHandler: [
			guardAuthenticate<PUTSetsSetUUIDRequest, PUTSetsSetUUIDParams, any>,
		],
	},
	routePUTSetsSetUUID,
);
server.delete(
	'/sets/:setUUID',
	{
		schema: schemaDELETESetsSetUUID,
		preHandler: [guardAuthenticate<any, DELETESetsSetUUIDParams, any>],
	},
	routeDELETESetsSetUUID,
);
server.get(
	'/sets/:setUUID/cards',
	{
		schema: schemaSetsSetUUIDCards,
	},
	routeSetsSetUUIDCards,
);

// Set review endpoints
server.post(
	'/sets/:setUUID/review',
	{
		schema: schemaPOSTSetsSetUUIDReview,
		preHandler: [
			guardAuthenticate<
				POSTSetsSetUUIDReviewRequest,
				POSTSetsSetUUIDReviewParams,
				any
			>,
		],
	},
	routePOSTSetSetUUIDReview,
);
server.get(
	'/sets/:setUUID/reviews',
	{
		schema: schemaGETSetsSetUUIDReviews,
	},
	routeGETSetSetUUIDReviews,
);
server.get(
	'/sets/:setUUID/reviews/:reviewUUID',
	{
		schema: schemaGETSetsSetUUIDReviewsReviewUUID,
	},
	routeGETSetSetUUIDReviewsReviewUUID,
);
server.get(
	'/sets/:setUUID/reviews/authors/:authorUUID',
	{
		schema: schemaGETSetsSetUUIDReviewsAuthorUUID,
	},
	routeGETSetSetUUIDReviewsAuthorUUID,
);

// User endpoints
server.get(
	'/users',
	{
		schema: schemaGETUsers,
		preHandler: [guardAuthenticate<any, any, any>, guardIsAdmin<any, any, any>],
	},
	routeGETUsers,
);
server.get(
	'/users/:userUUID',
	{
		schema: schemaGETUsersUserUUID,
		preHandler: [guardAuthenticate<any, GETUsersUserUUIDParams, any>],
	},
	routeGETUsersUserUUID,
);
server.post(
	'/users',
	{
		schema: schemaPOSTUsers,
	},
	routePOSTUsers,
);
server.patch(
	'/users/:userUUID',
	{
		schema: schemaPATCHUsersUserUUID,
		preHandler: [
			guardAuthenticate<
				PATCHUsersUserUUIDRequest,
				PATCHUsersUserUUIDParams,
				any
			>,
		],
	},
	routePATCHUsersUserUUID,
);
server.patch(
	'/users/:userUUID/password',
	{
		schema: schemaPATCHUsersUserUUIDPassword,
		preHandler: [
			guardAuthenticate<
				PATCHUsersUserUUIDPasswordRequest,
				PATCHUsersUserUUIDPasswordParams,
				any
			>,
		],
	},
	routePATCHUsersUserUUIDPassword,
);
server.get(
	'/users/:userUUID/sets',
	{
		schema: schemaUsersUserUUIDSets,
	},
	routeUsersUserUUIDSets,
);
server.delete(
	'/users/:userUUID',
	{
		schema: schemaDELETEUsersUserUUID,
		preHandler: [guardAuthenticate<any, DELETEUsersUserUUIDParams, any>],
	},
	routeDELETEUsersUserUUID,
);

// Flashcard log endpoints
server.post(
	'/logs/flashcards',
	{
		schema: schemaPOSTFlashcardCardUUIDLog,
		preHandler: [guardAuthenticate<POSTFlashcardCardUUIDLogRequest, any, any>],
	},
	routePOSTFlashcardsCardUUIDlog,
);

// Hidden card allocation endpoints
server.get(
	'/hiddenCards/:userUUID',
	{
		schema: schemaGETHiddenCardsUserUUID,
	},
	routeGETHiddenCardUserUUID,
);
server.post(
	'/hiddenCards/:userUUID',
	{
		schema: schemaPOSTHiddenCardsUserUUID,
		preHandler: [
			guardAuthenticate<
				POSTHiddenCardsUserUUIDRequest,
				POSTHiddenCardsUserUUIDParams,
				any
			>,
		],
	},
	routePOSTHiddenCardUserUUID,
);
server.delete(
	'/hiddenCards/:userUUID/:cardUUID',
	{
		schema: schemaDELETEHiddenCardsUserUUID,
		preHandler: [guardAuthenticate<any, DELETEHiddenCardsUserUUIDParams, any>],
	},
	routeDELETEHiddenCardUserUUID,
);

// Collection endpoints
server.get(
	'/collections',
	{
		schema: schemaGETCollections,
		preHandler: [guardAuthenticate<any, any, any>, guardIsAdmin<any, any, any>],
	},
	routeGETCollections,
);
server.get(
	'/users/:userUUID/collections',
	{
		schema: schemaGETUsersUserUUIDCollections,
		preHandler: [
			guardAuthenticate<
				any,
				GETUsersUserUUIDCollectionsParams,
				GETUsersUserUUIDCollectionsQuery
			>,
		],
	},
	routeGETUsersUserUUIDCollections,
);
server.get(
	'/users/:userUUID/collections/:collectionUUID',
	{
		schema: schemaGETUsersUserUUIDCollectionsCollectionUUID,
		preHandler: [
			guardAuthenticate<
				any,
				GETUsersUserUUIDCollectionsCollectionUUIDParams,
				any
			>,
		],
	},
	routeGETUsersUserUUIDCollectionsCollectionUUID,
);
server.post(
	'/users/:userUUID/collections',
	{
		schema: schemaPOSTUsersUserUUIDCollections,
		preHandler: [
			guardAuthenticate<
				POSTUsersUserUUIDCollectionsRequest,
				POSTUsersUserUUIDCollectionsParams,
				any
			>,
		],
	},
	routePOSTUsersUserUUIDCollections,
);
server.patch(
	'/users/:userUUID/collections/:collectionUUID',
	{
		schema: schemaPATCHUsersUserUUIDCollectionsCollectionUUID,
		preHandler: [
			guardAuthenticate<
				PATCHUsersUserUUIDCollectionsCollectionUUIDRequest,
				PATCHUsersUserUUIDCollectionsCollectionUUIDParams,
				any
			>,
		],
	},
	routePATCHUsersUserUUIDCollectionsCollectionUUID,
);
server.delete(
	'/users/:userUUID/collections/:collectionUUID',
	{
		schema: schemaDELETEUsersUserUUIDCollectionsCollectionUUID,
		preHandler: [
			guardAuthenticate<
				any,
				DELETEUsersUserUUIDCollectionsCollectionUUIDParams,
				any
			>,
		],
	},
	routeDELETEUsersUserUUIDCollectionsCollectionUUID,
);

// Collection set allocation endpoints
server.get(
	'/users/:userUUID/collections/:collectionUUID/sets',
	{
		schema: schemaGETUserCollectionSetAllocations,
		preHandler: [
			guardAuthenticate<any, GETUserCollectionSetAllocationsParams, any>,
		],
	},
	routeGETUserCollectionSetAllocations,
);
server.post(
	'/users/:userUUID/collections/:collectionUUID/sets',
	{
		schema: schemaPOSTUserCollectionSetAllocation,
		preHandler: [
			guardAuthenticate<
				POSTUserCollectionSetAllocationsRequest,
				POSTUserCollectionSetAllocationsParams,
				any
			>,
		],
	},
	routePOSTUserCollectionSetAllocations,
);
server.delete(
	'/users/:userUUID/collections/:collectionUUID/sets/:setUUID',
	{
		schema: schemaDELETEUserCollectionSetAllocation,
		preHandler: [
			guardAuthenticate<any, DELETEUserCollectionSetAllocationsParams, any>,
		],
	},
	routeDELETEUserCollectionSetAllocations,
);

// System configuration endpoints
server.get(
	'/systemConfig/setCreationLimit',
	{
		schema: schemaGETSetCreationLimit,
		preHandler: [
			guardAuthenticate<PATCHSetCreationLimitRequestBody, any, any>,
			guardIsAdmin<PATCHSetCreationLimitRequestBody, any, any>,
		],
	},
	routeGETSetCreationLimit,
);
server.patch(
	'/systemConfig/setCreationLimit',
	{
		schema: schemaPATCHSetCreationLimit,
		preHandler: [guardAuthenticate<any, any, any>, guardIsAdmin<any, any, any>],
	},
	routePATCHSetCreationLimit,
);
server.delete(
	'/systemConfig/creationCounter',
	{
		schema: schemaDELETECreationCounter,
		preHandler: [guardAuthenticate<any, any, any>, guardIsAdmin<any, any, any>],
	},
	routeDELETECreationCounter,
);

// Start server
server.listen(
	{ port: port, host: '0.0.0.0' },
	(error: Error | null, address: string) => {
		if (error) {
			server.log.error(error);
			db.$disconnect();
		}
		console.log(`API ready on: ${address}`);
	},
);

// Listen for process termination signals to close the server
process.on('SIGTERM', () => {
	server.close().then(async () => {
		console.log('Server closed!');
		await db.$disconnect();
		process.exit(0);
	});
});
process.on('SIGINT', () => {
	server.close().then(async () => {
		console.log('Server closed!');
		await db.$disconnect();
		process.exit(0);
	});
});

// Export server object for use in testing
export default server;
