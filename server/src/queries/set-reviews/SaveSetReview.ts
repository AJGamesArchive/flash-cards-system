// Imports
import { db } from "../../Server.js";
import SetReview from "../../types/SetReview.js";

/**
 * Async function to save a set review to the database
 * @param review Review Data Object to save
 * @param newFlag Optional - Flag to indicate whether the review is new
 * @returns HTML status code - 200 Success, 500 Server Error, 404 Set Review Not FOund
 */
async function saveSetReview(review: SetReview, newFlag?: boolean): Promise<number> {
  try {
    if(newFlag) {
      if(!review.authorUUID) return 500;
      await db.setReview.create({
        data: {
          reviewUUID: review.reviewUUID,
          review: review.review,
          starRating: review.starRating,
          reviewDate: review.reviewDate,
          updatedAt: review.updatedAt,
          author: {
            connect: {
              userUUID: review.authorUUID,
            },
          },
          set: {
            connect: {
              setUUID: review.setUUID,
            },
          },
        },
      });
    } else {
      await db.setReview.update({
        where: {
          reviewUUID: review.reviewUUID,
        },
        data: {
          review: review.review,
          starRating: review.starRating,
          updatedAt: review.updatedAt,
        },
      });
    };
    return 200;
  } catch (error: any) {
    console.error(error);
    return (newFlag) ? 500 : 404;
  };
};

export default saveSetReview;