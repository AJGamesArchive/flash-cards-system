// Imports
import { FastifySchema } from 'fastify';

export interface POSTUsersUserUUIDCollectionsParams {
	userUUID: string;
}

export interface POSTUsersUserUUIDCollectionsRequest {
	name: string;
	description: string;
}

export interface POSTUsersUserUUIDCollectionsReply201 {
	collectionUUID: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	authorUUID: string;
	numSets: number;
}

export interface POSTUsersUserUUIDCollectionsReplyError {
	message: string;
}

const schemaPOSTUsersUserUUIDCollections: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			userUUID: { type: 'string' },
		},
		required: ['userUUID'],
	},
	body: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			description: { type: 'string' },
		},
		required: ['name', 'description'],
	},
	response: {
		201: {
			type: 'object',
			properties: {
				collectionUUID: { type: 'string' },
				name: { type: 'string' },
				description: { type: 'string' },
				createdAt: { type: 'string', format: 'date-time' },
				updatedAt: { type: 'string', format: 'date-time' },
				authorUUID: { type: 'string' },
				numSets: { type: 'number' },
			},
			required: [
				'collectionUUID',
				'name',
				'description',
				'createdAt',
				'updatedAt',
				'authorUUID',
				'numSets',
			],
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

export default schemaPOSTUsersUserUUIDCollections;
