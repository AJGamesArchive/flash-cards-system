// Imports
import { FastifySchema } from 'fastify';

export interface AuthenticateReplyError {
	message: string;
}

const schemaAuthenticate: FastifySchema = {
	response: {
		401: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export default schemaAuthenticate;
