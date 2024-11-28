/**
 * Function to calculate the average rating of a set
 * @param ratings Array of reviews star ratings to calculate the average from
 * @returns Average star rating of the set
 */
function calculateAverageSetRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const totalRating = ratings.reduce((acc, ratings) => acc + ratings, 0);
  const averageRating = totalRating / ratings.length;
  return averageRating;
};

export default calculateAverageSetRating;