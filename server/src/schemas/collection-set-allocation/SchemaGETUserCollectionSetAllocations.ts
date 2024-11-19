// Imports
import { FastifySchema } from 'fastify';

export interface GETUserCollectionSetAllocationsParams {
	userUUID: string;
	collectionUUID: string;
}

export interface GETUserCollectionSetAllocationsReply200 {
	setUUID: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	authorUUID: string;
	authorUsername: string;
	numReviews: number;
	numFlashcards: number;
}

export interface GETUserCollectionSetAllocationsReplyError {
	message: string;
}

const schemaGETUserCollectionSetAllocations: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			userUUID: { type: 'string' },
			collectionUUID: { type: 'string' },
		},
		required: ['userUUID', 'collectionUUID'],
	},
	response: {
		200: {
			type: 'array',
			items: {
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
					numFlashcards: { type: 'string' },
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
				],
			},
		},
		401: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
		403: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
		500: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export default schemaGETUserCollectionSetAllocations;
