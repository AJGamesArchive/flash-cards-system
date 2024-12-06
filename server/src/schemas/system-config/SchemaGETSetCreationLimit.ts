import { FastifySchema } from 'fastify';

export interface GETSetCreationLimitReply200 {
	setCreationLimit: number;
	creationCounter: number;
	date: string;
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
				date: { type: 'string', format: 'date-time' },
			},
			required: ['setCreationLimit', 'creationCounter', "date"],
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
