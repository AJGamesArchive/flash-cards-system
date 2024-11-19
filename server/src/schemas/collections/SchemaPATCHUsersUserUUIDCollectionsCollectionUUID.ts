// Imports
import { FastifySchema } from 'fastify';

export interface PATCHUsersUserUUIDCollectionsCollectionUUIDParams {
	userUUID: string;
	collectionUUID: string;
}

export interface PATCHUsersUserUUIDCollectionsCollectionUUIDRequest {
	name: string;
	description: string;
}

export interface PATCHUsersUserUUIDCollectionsCollectionUUIDReply200 {
	collectionUUID: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	authorUUID: string;
	numSets: number;
}

export interface PATCHUsersUserUUIDCollectionsCollectionUUIDReplyError {
	message: string;
}

const schemaPATCHUsersUserUUIDCollectionsCollectionUUID: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			userUUID: { type: 'string' },
			collectionUUID: { type: 'string' },
		},
		required: ['userUUID', 'collectionUUID'],
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
		200: {
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

export default schemaPATCHUsersUserUUIDCollectionsCollectionUUID;
