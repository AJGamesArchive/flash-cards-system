// Imports
import { FastifySchema } from 'fastify';

export interface ConfirmLoginReply200 {
	loggedIn: boolean;
	user: object;
}

export interface ConfirmLoginReply401 {
	loggedIn: boolean;
}

const schemaConfirmLogin: FastifySchema = {
	response: {
		200: {
			type: 'object',
			properties: {
				loggedIn: { type: 'boolean' },
				user: {
					type: 'object',
					properties: {
						username: { type: 'string' },
						uuid: { type: 'string' },
						isAdmin: { type: 'boolean' },
					},
				},
			},
		},
		401: {
			type: 'object',
			properties: {
				loggedIn: { type: 'boolean' },
			},
		},
	},
};

export default schemaConfirmLogin;
