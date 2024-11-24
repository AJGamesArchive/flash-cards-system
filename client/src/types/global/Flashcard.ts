// Imports
import Difficulty from "./Difficulty";

/**
 * Type to define the data of a flashcard
 */
type Flashcard = {
  cardUUID: string;
  question: string;
  answer: string;
  difficulty: Difficulty | null;
  createdAt: string;
  updatedAt: string;
  setUUID: string;
};

export default Flashcard;