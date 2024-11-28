// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import getSetReviews, {
	FullSetReview,
} from '../../queries/set-reviews/GetSetReviews.js';
import {
	GETSetsSetUUIDReviewsParams,
	GETSetsSetUUIDReviewsReply200,
	GETSetsSetUUIDReviewsReplyError,
} from '../../schemas/set-reviews/SchemaGETSetsSetUUIDReviews.js';

/**
 * Route to fetch all set reviews from the DB
 */
const routeGETSetSetUUIDReviews = async (
	req: FastifyRequest<{ Params: GETSetsSetUUIDReviewsParams }>,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch reviews
	const allReviews: FullSetReview[] = await getSetReviews(req.params.setUUID);
	if (allReviews.length === 0) {
		rep.status(404).send({
			message: 'No Reviews Found',
		} as GETSetsSetUUIDReviewsReplyError);
		return;
	};

	// Return reviews
	rep.status(200).send(
		allReviews.map(
			(review) =>
				({
					...review,
					reviewDate: review.reviewDate.toISOString(),
					updatedAt: review.updatedAt.toISOString(),
				}) as GETSetsSetUUIDReviewsReply200,
		) as GETSetsSetUUIDReviewsReply200[],
	);
	return;
};

export default routeGETSetSetUUIDReviews;
