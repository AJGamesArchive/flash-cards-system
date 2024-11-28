// Imports
import { FastifySchema } from 'fastify';

export interface DELETEHiddenCardsUserUUIDParams {
	userUUID: string;
	cardUUID: string;
}

export interface DELETEHiddenCardsUserUUIDReplyError {
	message: string;
}

const schemaDELETEHiddenCardsUserUUID: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			userUUID: { type: 'string' },
			cardUUID: { type: 'string' },
		},
		required: ['userUUID', 'cardUUID'],
	},
	response: {
		204: {},
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

export default schemaDELETEHiddenCardsUserUUID;
