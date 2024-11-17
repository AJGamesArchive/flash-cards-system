/**
 * Type to define the data that powers flashcard usage logs
 */
type FlashcardUsageLog = {
  logUUID: string;
  faceDownTime: number;
  revisionTime: number;
  timesFlipped: number;
  cardUUID: string;
};

export default FlashcardUsageLog;