// Imports
import { FastifySchema } from 'fastify';

export interface POSTFlashcardCardUUIDLogRequest {
	faceDownTime: number;
	revisionTime: number;
	timesFlipped: number;
	cardUUID: string;
}

export interface POSTFlashcardCardUUIDLogReply201 {
	logUUID: string;
	faceDownTime: number;
	revisionTime: number;
	timesFlipped: number;
	cardUUID: string;
}

export interface POSTFlashcardLCardUUIDogReplyError {
	message: string;
}

const schemaPOSTFlashcardCardUUIDLog: FastifySchema = {
	body: {
		type: 'object',
		properties: {
			faceDownTime: { type: 'number' },
			revisionTime: { type: 'number' },
			timesFlipped: { type: 'number' },
			cardUUID: { type: 'string' },
		},
		required: [
			'faceDownTime',
			'revisionTime',
			'timesFlipped',
			'cardUUID',
		],
	},
	response: {
		201: {
			type: 'object',
			properties: {
				logUUID: { type: 'string' },
				faceDownTime: { type: 'number' },
				revisionTime: { type: 'number' },
				timesFlipped: { type: 'number' },
				cardUUID: { type: 'string' },
			},
			required: [
				'logUUID',
				'faceDownTime',
				'revisionTime',
				'timesFlipped',
				'cardUUID',
			],
		},
		401: {
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
	},
};

export default schemaPOSTFlashcardCardUUIDLog;
