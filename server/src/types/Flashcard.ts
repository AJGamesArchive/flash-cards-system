// Imports
import Difficulty from './Difficulty.js';

/**
 * Type to define the data that powers a single flashcard
 */
type Flashcard = {
	cardUUID: string;
	question: string;
	answer: string;
	difficulty: Difficulty | string | null;
	createdAt: Date;
	updatedAt: Date;
	setUUID: string;
};

export default Flashcard;
