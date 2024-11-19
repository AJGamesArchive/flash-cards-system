// Imports
import { FastifySchema } from 'fastify';

export interface POSTUsersRequest {
	username: string;
	password: string;
	adminFlag: boolean;
	apiAccount: boolean;
}

export interface POSTUsersReply201 {
	userUUID: string;
	username: string;
	adminFlag: boolean;
	userSince: string;
	deleted: boolean;
	apiAccount: boolean;
}

export interface POSTUsersReplyError {
	message: string;
}

const schemaPOSTUsers: FastifySchema = {
	body: {
		type: 'object',
		properties: {
			username: { type: 'string' },
			password: { type: 'string' },
			adminFlag: { type: 'boolean' },
			apiAccount: { type: 'boolean' },
		},
		required: ['username', 'password', 'adminFlag', 'apiAccount'],
	},
	response: {
		201: {
			type: 'object',
			properties: {
				userUUID: { type: 'string' },
				username: { type: 'string' },
				adminFlag: { type: 'boolean' },
				userSince: { type: 'string', format: 'date-time' },
				deleted: { type: 'boolean' },
				apiAccount: { type: 'boolean' },
			},
			required: [
				'userUUID',
				'username',
				'adminFlag',
				'userSince',
				'deleted',
				'apiAccount',
			],
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

export default schemaPOSTUsers;
