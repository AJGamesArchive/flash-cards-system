// Imports
import { FastifySchema } from 'fastify';

export interface GETSetsSetUUIDReviewsAuthorUUIDParams {
	setUUID: string;
	authorUUID: string;
}

export interface GETSetsSetUUIDReviewsAuthorUUIDReply200 {
	reviewUUID: string;
	review: string;
	starRating: number;
	reviewDate: string;
	updatedAt: string;
	authorUUID: string | null;
	authorUsername: string | null;
	setUUID: string;
}

export interface GETSetsSetUUIDReviewsAuthorUUIDReplyError {
	message: string;
}

const schemaGETSetsSetUUIDReviewsAuthorUUID: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			setUUID: { type: 'string' },
			authorUUID: { type: 'string' },
		},
		required: ['setUUID', 'authorUUID'],
	},
	response: {
		200: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					reviewUUID: { type: 'string' },
					review: { type: 'string' },
					starRating: { type: 'number' },
					reviewDate: { type: 'string', format: 'date-time' },
					updatedAt: { type: 'string', format: 'date-time' },
					authorUUID: {
						type: ['string', 'null'],
					},
					authorUsername: {
						type: ['string', 'null'],
					},
					setUUID: { type: 'string' },
				},
				required: [
					'reviewUUID',
					'review',
					'starRating',
					'reviewDate',
					'authorUUID',
					'authorUsername',
					'setUUID',
				],
			},
		},
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export default schemaGETSetsSetUUIDReviewsAuthorUUID;
