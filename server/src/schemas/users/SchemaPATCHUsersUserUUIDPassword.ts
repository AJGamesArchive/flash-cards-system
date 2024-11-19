// Imports
import { FastifySchema } from 'fastify';

export interface PATCHUsersUserUUIDPasswordParams {
	userUUID: string;
}

export interface PATCHUsersUserUUIDPasswordRequest {
	oldPassword: string;
	newPassword: string;
}

export interface PATCHUsersUserUUIDPasswordReplyError {
	message: string;
}

const schemaPATCHUsersUserUUIDPassword: FastifySchema = {
	params: {
		type: 'object',
		properties: {
			userUUID: { type: 'string' },
		},
		required: ['userUUID'],
	},
	body: {
		type: 'object',
		properties: {
			oldPassword: { type: 'string' },
			newPassword: { type: 'string' },
		},
		required: ['oldPassword', 'newPassword'],
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

export default schemaPATCHUsersUserUUIDPassword;
