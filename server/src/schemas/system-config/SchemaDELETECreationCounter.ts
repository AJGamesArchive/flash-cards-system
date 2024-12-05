import { FastifySchema } from 'fastify';

export interface DELETECreationCounterReplyError {
	message: string;
}

const schemaDELETECreationCounter: FastifySchema = {
	response: {
		204: {},
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

export default schemaDELETECreationCounter;
