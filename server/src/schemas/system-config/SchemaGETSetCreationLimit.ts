import { FastifySchema } from 'fastify';

export interface GETSetCreationLimitReply200 {
	setCreationLimit: number;
	creationCounter: number;
}

export interface GETSetCreationLimitReplyError {
	message: string;
}

const schemaGETSetCreationLimit: FastifySchema = {
	response: {
		200: {
			type: 'object',
			properties: {
				setCreationLimit: { type: 'number' },
				creationCounter: { type: 'number' },
			},
			required: ['setCreationLimit', 'creationCounter'],
		},
		403: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
			required: ['message'],
		},
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
			required: ['message'],
		},
	},
};

export default schemaGETSetCreationLimit;
