// Imports
import { FastifySchema } from 'fastify';

export interface LogoutReply {
	message: string;
}

const schemaLogout: FastifySchema = {
	response: {
		202: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
		401: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
	},
};

export default schemaLogout;
