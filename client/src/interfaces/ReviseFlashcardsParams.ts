/**
 * Interface to define the Revise FLashcards page params
 */
interface ReviseFLashcardsParams extends Record<string, string> {
  setUUID: string;
  query: string;
};

export default ReviseFLashcardsParams;