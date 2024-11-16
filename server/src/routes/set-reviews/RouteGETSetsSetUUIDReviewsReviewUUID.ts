// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  GETSetsSetUUIDReviewsReviewUUIDParams,
  GETSetsSetUUIDReviewsReviewUUIDReply200,
  GETSetsSetUUIDReviewsReviewUUIDReplyError
} from "../../schemas/set-reviews/SchemaGETSetsSetUUIDReviewsReviewUUID.js";
import getSetReviews, { FullSetReview } from "../../queries/set-reviews/GetSetReviews.js";

/**
 * Route to fetch a specific set review from the DB
 */
const routeGETSetSetUUIDReviewsReviewUUID = async (
  req: FastifyRequest<{ Params: GETSetsSetUUIDReviewsReviewUUIDParams }>,
  rep: FastifyReply
): Promise<void> => {
  // Fetch reviews
  const review: FullSetReview[] = await getSetReviews(req.params.setUUID, req.params.reviewUUID);
  if(review.length !== 1) {
    rep.status(404).send({
      message: "Review Not Found"
    } as GETSetsSetUUIDReviewsReviewUUIDReplyError);
    return;
  };

  // Return reviews
  rep.status(200).send({
    ...review[0],
    reviewDate: review[0].reviewDate.toISOString(),
    updatedAt: review[0].updatedAt.toISOString(),
  } as GETSetsSetUUIDReviewsReviewUUIDReply200);
  return;
};

export default routeGETSetSetUUIDReviewsReviewUUID;
