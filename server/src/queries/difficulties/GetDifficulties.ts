// Imports
import { db } from "../../Server.js";
import Difficulty from "../../types/Difficulty.js";

/**
 * Async function to fetch all difficulties from the DB
 */
async function getDifficulties(): Promise<Difficulty[]> {
  const difficultiesQuery = await db.difficulties.findMany();
  const difficulties: Difficulty[] = difficultiesQuery.map((difficulty) => ({
    difficultyUUID: difficulty.difficultyUUID,
    value: difficulty.value,
  } as Difficulty));
  return difficulties;
};

export default getDifficulties;