// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import getSetReviews, {
	FullSetReview,
} from '../../queries/set-reviews/GetSetReviews.js';
import {
	GETSetsSetUUIDReviewsParams,
	GETSetsSetUUIDReviewsReply200,
	// GETSetsSetUUIDReviewsReplyError,
} from '../../schemas/set-reviews/SchemaGETSetsSetUUIDReviews.js';

//TODO Find a better way to detecting 'Set Not Found' and re-add 404 if time permits

/**
 * Route to fetch all set reviews from the DB
 */
const routeGETSetSetUUIDReviews = async (
	req: FastifyRequest<{ Params: GETSetsSetUUIDReviewsParams }>,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch reviews
	const allReviews: FullSetReview[] = await getSetReviews(req.params.setUUID);

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
