/**
 * Type to define the data of a Flashcard Set
 */
type Set = {
  setUUID: string;
  name: string;
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  authorUUID: string;
  authorUsername: string;
  numReviews: number;
  numFlashcards: number;
};

export default Set;