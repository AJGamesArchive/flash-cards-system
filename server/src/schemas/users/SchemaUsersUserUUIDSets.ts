// Imports
import { FastifySchema } from 'fastify';

export interface UserUserUUIDSetsParams {
	userUUID: string;
}

export interface UserUserUUIDSetsReply200 {
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

export interface UsersUserUUIDSetsReplyError {
	message: string;
}

const schemaUsersUserUUIDSets: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			userUUID: { type: 'string' },
		},
		required: ['userUUID'],
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
		},
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export default schemaUsersUserUUIDSets;
