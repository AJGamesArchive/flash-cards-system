/**
 * Type to define the data of a Flashcard Set
 */
type Set = {
  setUUID: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorUUID: string;
  authorUsername: string;
  numReviews: number;
  numFlashcards: number;
};

/**
 * Type to define the core base set details
 */
export type BaseSet = {
  setUUID: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorUUID: string;
};

export default Set;