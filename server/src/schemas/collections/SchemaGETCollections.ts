// Imports
import { FastifySchema } from 'fastify';

export interface GETCollectionsReply200 {
	collectionUUID: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	authorUUID: string;
	numSets: number;
}

export interface GETCollectionsReplyError {
	message: string;
}

const schemaGETCollections: FastifySchema = {
	response: {
		200: {
			type: 'array',
			items: {
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
		500: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export default schemaGETCollections;
