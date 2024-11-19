// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import getSetReviews, {
	FullSetReview,
} from '../../queries/set-reviews/GetSetReviews.js';
import {
	GETSetsSetUUIDReviewsAuthorUUIDParams,
	GETSetsSetUUIDReviewsAuthorUUIDReply200,
	GETSetsSetUUIDReviewsAuthorUUIDReplyError,
} from '../../schemas/set-reviews/SchemaGETSetsSetUUIDReviewsAuthorUUID.js';

/**
 * Route to fetch all set reviews by a given author
 */
const routeGETSetSetUUIDReviewsAuthorUUID = async (
	req: FastifyRequest<{ Params: GETSetsSetUUIDReviewsAuthorUUIDParams }>,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch reviews
	const allReviews: FullSetReview[] = await getSetReviews(
		req.params.setUUID,
		undefined,
		req.params.authorUUID,
	);
	if (allReviews.length === 0) {
		rep.status(404).send({
			message: 'No reviews were found for that author.',
		} as GETSetsSetUUIDReviewsAuthorUUIDReplyError);
		return;
	}

	// Return reviews
	rep.status(200).send(
		allReviews.map(
			(review) =>
				({
					...review,
					reviewDate: review.reviewDate.toISOString(),
					updatedAt: review.updatedAt.toISOString(),
				}) as GETSetsSetUUIDReviewsAuthorUUIDReply200,
		) as GETSetsSetUUIDReviewsAuthorUUIDReply200[],
	);
	return;
};

export default routeGETSetSetUUIDReviewsAuthorUUID;
