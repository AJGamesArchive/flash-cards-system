// Imports
import { Badge } from "primereact/badge";
import Difficulty from "../../types/global/Difficulty";
import commonColors from "../../static/Colors";

/**
 * Function to generate a UI difficulties tag component for a given difficulty
 * @param rank Rank to generate Badge for
 * @returns React Node
 */
const getDifficultyTag = (difficulty: Difficulty | null): React.ReactNode => {
  switch(difficulty) {
    case 'Easy':
      return <Badge value={difficulty} style={{ backgroundColor: commonColors.Green, fontSize: '1.1rem' }}/>
    case 'Medium':
      return <Badge value={difficulty} style={{ backgroundColor: commonColors.Yellow, fontSize: '1.1rem' }}/>
    case 'Hard':
      return <Badge value={difficulty} style={{ backgroundColor: commonColors.Red, fontSize: '1.1rem' }}/>
    default:
      return <Badge value={'No Difficulty'} style={{ backgroundColor: commonColors.Teal, fontSize: '1.1rem' }}/>
  };
};

export default getDifficultyTag;