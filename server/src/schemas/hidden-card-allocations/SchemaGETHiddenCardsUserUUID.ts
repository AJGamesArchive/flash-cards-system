// Imports
import { FastifySchema } from 'fastify';

export interface GETHiddenCardsUserUUIDParams {
	userUUID: string;
}

const schemaGETHiddenCardsUserUUID: FastifySchema = {
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
				type: 'string',
			},
		},
	},
};

export default schemaGETHiddenCardsUserUUID;
