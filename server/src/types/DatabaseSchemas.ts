// Imports
import { PrismaClient } from '@prisma/client';

// Type declarations for database tables
export type DBUsers = PrismaClient['users'];
export type DBFlashcards = PrismaClient['flashCards'];
export type DBDifficulties = PrismaClient['difficulties'];
export type DBFlashcardUsageLogs = PrismaClient['flashCardUsageLogs'];
export type DBHiddenCardAllocation = PrismaClient['hiddenCardAllocation'];
export type DBSets = PrismaClient['sets'];
export type DBSetReviews = PrismaClient['setReview'];
export type DBCollections = PrismaClient['collections'];
export type DBCollectionAllocation = PrismaClient['collectionAllocations'];
export type DBSystemConfig = PrismaClient['systemConfig'];