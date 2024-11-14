/**
 * Type to define the data that powers a flashcard set
 */
type FlashcardSet = {
  setUUID: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  authorUUID: string;
};

export default FlashcardSet;