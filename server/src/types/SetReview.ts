/**
 * Type to define the data that powers Set Reviews
 */
type SetReview = {
	reviewUUID: string;
	review: string;
	starRating: number;
	reviewDate: Date;
	updatedAt: Date;
	authorUUID: string | null;
	setUUID: string;
};

export default SetReview;
