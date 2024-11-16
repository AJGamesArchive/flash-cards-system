// Imports
import { db } from "../../Server.js";
import FlashcardSet from "../../types/FlashcardSet.js";
import SetReview from "../../types/SetReview.js";

/**
 * Type to define data the full set data returned from the database
 */
export type FullSet = {
  setDetails: FlashcardSet;
  reviews: SetReview[];
};

/**
 * Async function to retrieve a set and all it's reviews from the database based on given params
 * @note Fetches all sets if no params are passed
 * @param authorUUID Optional - UUID of user to retrieve sets for
 * @param setUUID Optional - UUID of specific set to fetch
 * @note Set UUID overrides user UUID if both params are passed
 * @returns Set details and reviews
 */
async function getSets(authorUUID?: string, setUUID?: string): Promise<FullSet[]> {
  // Define variables to store base fetched data
  let setQuery;
  var reviewQuery: Array<any>;

  // Fetch data from DB
  if(authorUUID || setUUID) {
    if(setUUID) {
      // Fetch specific set and it's reviews
      [setQuery, reviewQuery] = await Promise.all([
        db.sets.findMany({
          where: {
            setUUID: setUUID,
          },
        }),
        db.setReview.findMany({
          where: {
            setUUID: setUUID,
          },
        }),
      ]);
    } else {
      // Fetch all sets authored by a given user and all of their corresponding reviews
      [setQuery, reviewQuery] = await Promise.all([
        db.sets.findMany({
          where: {
            authorUUID: authorUUID,
          },
        }),
        db.setReview.findMany({
          where: {
            set: {
              authorUUID: authorUUID,
            },
          },
        }),
      ]);
    };
  } else {
    // Fetch all sets and all set reviews
    [setQuery, reviewQuery] = await Promise.all([
      db.sets.findMany(),
      db.setReview.findMany(),
    ]);
  };

  // Map over all fetched sets and generate FullSet objects
  const fullSets: FullSet[] = setQuery.map((set) => {
    // Find all reviews for this set and generate SetReview objects for each review
    const filteredReviews = reviewQuery.filter((review) => review.setUUID === set.setUUID);
    const reviews: SetReview[] = filteredReviews.map((review) => ({
      reviewUUID: review.reviewUUID,
      review: review.review,
      starRating: review.starRating,
      reviewDate: review.reviewDate,
      authorUUID: review.authorUUID,
      setUUID: review.setUUID,
    } as SetReview));
    return {
      setDetails: {
        setUUID: set.setUUID,
        name: set.name,
        description: set.description,
        createdAt: set.createdAt,
        updatedAt: set.updatedAt,
        authorUUID: set.authorUUID,
      },
      reviews: reviews,
    } as FullSet;
  });

  // Return mapped data
  return fullSets;
};

export default getSets;