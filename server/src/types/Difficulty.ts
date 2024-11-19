/**
 * Type to define the data that powers difficulties
 */
type Difficulty = {
	difficultyUUID: string;
	value: DifficultyOptions;
};

/**
 * Type to define flashcard difficulties
 */
export type DifficultyOptions = 'Easy' | 'Medium' | 'Hard';

export default Difficulty;
