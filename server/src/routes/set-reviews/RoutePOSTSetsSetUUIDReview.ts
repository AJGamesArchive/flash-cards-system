// Imports
import { FastifyRequest, FastifyReply } from "fastify";
import {
  POSTSetsSetUUIDReviewParams,
  POSTSetsSetUUIDReviewRequest,
  POSTSetsSetUUIDReviewReply201,
  POSTSetsSetUUIDReviewReplyError
} from "../../schemas/set-reviews/SchemaPOSTSetsSetUUIDReview.js";
import SetReview from "../../types/SetReview.js";
import JWTData from "../../types/JWTData.js";
import { v4 as uuidGen } from 'uuid';
import saveSetReview from "../../queries/set-reviews/SaveSetReview.js";

/**
 * @protected
 * Route to create a review for a given set
 */
const routePOSTSetSetUUIDReview = async (
  req: FastifyRequest<{ Params: POSTSetsSetUUIDReviewParams, Body: POSTSetsSetUUIDReviewRequest }>,
  rep: FastifyReply
): Promise<void> => {
  // Map JWT data
  let userData: JWTData;
  try {
    userData = req.user as JWTData;
  } catch (error: any) {
    rep.status(500).send({
      message: 'Something went wrong, please try again.',
    } as POSTSetsSetUUIDReviewReplyError);
    return;
  };

  // Create timestamp
  const now: Date = new Date();

  // Create set review object
  const newSetReview: SetReview = {
    reviewUUID: uuidGen(),
    review: req.body.review,
    starRating: req.body.starRating,
    reviewDate: now,
    updatedAt: now,
    authorUUID: userData.uuid,
    setUUID: req.params.setUUID,
  };

  // Add review to DB
  const saveStatus: number = await saveSetReview(newSetReview, true);
  if(saveStatus !== 200) {
    rep.status(saveStatus).send({
      message: (saveStatus === 404) ?
        "Set Not Found" :
        "Something went wrong, please try again",
    } as POSTSetsSetUUIDReviewReplyError);
    return;
  };

  // Return created set review
  rep.status(201).send({
    ...newSetReview,
    reviewDate: newSetReview.reviewDate.toISOString(),
    updatedAt: newSetReview.updatedAt.toISOString(),
  } as POSTSetsSetUUIDReviewReply201);
  return;
};

export default routePOSTSetSetUUIDReview;
