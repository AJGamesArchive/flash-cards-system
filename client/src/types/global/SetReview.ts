/**
 * Type to define the data of a set review
 */
type SetReview = {
  reviewUUID: string;
  review: string;
  starRating: number;
  reviewDate: string;
  updatedAt: string;
  authorUUID: string;
  authorUsername: string;
  setUUID: string;
};

export default SetReview;