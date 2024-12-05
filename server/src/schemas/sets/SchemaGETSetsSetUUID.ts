// Imports
import { FastifySchema } from 'fastify';

export interface GETSetsSetUUIDParams {
	setUUID: string;
}

export interface GETSetsSetUUIDReply200 {
	setUUID: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	authorUUID: string;
	authorUsername: string;
	numReviews: number;
	numFlashcards: number;
	averageRating: number;
}

export interface GETSetsSetUUIDReplyError {
	message: string;
}

const schemaGETSetsSetUUID: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			setUUID: { type: 'string' },
		},
		required: ['setUUID'],
	},
	response: {
		200: {
			type: 'object',
			properties: {
				setUUID: { type: 'string' },
				name: { type: 'string' },
				description: { type: 'string' },
				createdAt: { type: 'string', format: 'date-time' },
				updatedAt: { type: 'string', format: 'date-time' },
				authorUUID: { type: 'string' },
				authorUsername: { type: 'string' },
				numReviews: { type: 'number' },
				numFlashcards: { type: 'number' },
				averageRating: { type: 'number' },
			},
			required: [
				'setUUID',
				'name',
				'description',
				'createdAt',
				'updatedAt',
				'authorUUID',
				'authorUsername',
				'numReviews',
				'numFlashcards',
				'averageRating',
			],
		},
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export default schemaGETSetsSetUUID;
