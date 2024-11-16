// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  GETSetsSetUUIDReviewsParams,
  GETSetsSetUUIDReviewsReply201,
  GETSetsSetUUIDReviewsReplyError
} from "../../schemas/set-reviews/SchemaGETSetsSetUUIDReviews.js";
import getSetReviews, { FullSetReview } from "../../queries/set-reviews/GetSetReviews.js";

/**
 * Route to fetch all set reviews from the DB
 */
const routeGETSetSetUUIDReviews = async (
  req: FastifyRequest<{ Params: GETSetsSetUUIDReviewsParams }>,
  rep: FastifyReply
): Promise<void> => {
  // Fetch reviews
  const allReviews: FullSetReview[] = await getSetReviews(req.params.setUUID);
  if(allReviews.length === 0) {
    rep.status(404).send({
      message: "No reviews were found for that set."
    } as GETSetsSetUUIDReviewsReplyError);
    return;
  };

  // Return reviews
  rep.status(200).send(allReviews.map((review) => ({
    ...review,
    reviewDate: review.reviewDate.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  } as GETSetsSetUUIDReviewsReply201)) as GETSetsSetUUIDReviewsReply201[]);
  return;
};

export default routeGETSetSetUUIDReviews;
