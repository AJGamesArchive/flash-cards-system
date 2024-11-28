/**
 * Type for the flashcard usage log
 */
type FlashcardUsageLog = {
  faceDownTime: number;
  revisionTime: number;
  timesFlipped: number;
  cardUUID: string;
};

export default FlashcardUsageLog;