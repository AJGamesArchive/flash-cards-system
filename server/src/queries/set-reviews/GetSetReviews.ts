// Import
import { db } from "../../Server.js";

/**
 * Type to define the set review data fetched from the DB
 */
export type FullSetReview = {
  reviewUUID: string;
  review: string;
  starRating: number;
  reviewDate: Date;
  updatedAt: Date;
  authorUUID: string | null;
  authorUsername: string | null;
  setUUID: string;
};

/**
 * Async function to fetch a set review from the database
 * @note Fetches all set reviews if you specific review UUID is passed
 * @param setUUID UUID of set to fetch reviews for
 * @param reviewUUID Optional - UUID of specific review to fetch
 * @returns Array of set reviews
 */
async function getSetReviews(setUUID: string, reviewUUID?: string): Promise<FullSetReview[]> {
  // Define query var
  let query;

  // Run query based on params
  if(reviewUUID) {
    query = await db.setReview.findMany({
      where: {
        reviewUUID: reviewUUID,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
  } else {
    query = await db.setReview.findMany({
      where: {
        setUUID: setUUID,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
  };

  // Return reviews
  return query.map((review) => ({
    reviewUUID: review.reviewUUID,
    review: review.review,
    starRating: review.starRating,
    reviewDate: review.reviewDate,
    updatedAt: review.updatedAt,
    authorUUID: review.authorUUID,
    authorUsername: review.author?.username || null,
    setUUID: review.setUUID,
  } as FullSetReview)) as FullSetReview[];
};

export default getSetReviews;