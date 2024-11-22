// Imports
import Difficulty from "./Difficulty";

/**
 * Type to define the data of a flashcard
 */
type Flashcard = {
  cardUUID: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  createdAt: string | Date;
  updatedAt: string | Date;
  setUUID: string;
};

export default Flashcard;