// Imports
import { FastifySchema } from 'fastify';

import { DifficultyOptions } from '../../types/Difficulty';

export interface POSTSetsRequest {
	setDetails: {
		name: string;
		description: string;
		authorUUID?: string;
	};
	flashCards: {
		question: string;
		answer: string;
		difficulty: DifficultyOptions | null;
	}[];
}

export interface POSTSetsReply201 {
	setDetails: {
		setUUID: string;
		name: string;
		description: string;
		createdAt: string;
		updateAt: string;
		authorUUID: string;
	};
	flashCards: {
		cardUUID: string;
		question: string;
		answer: string;
		difficulty: DifficultyOptions | null;
		createdAt: string;
		updateAt: string;
		setUUID: string;
	}[];
}

export interface POSTSetsReplyError {
	message: string;
}

const schemaPOSTSets: FastifySchema = {
	body: {
		type: 'object',
		properties: {
			setDetails: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					description: { type: 'string' },
					authorUUID: { type: 'string' },
				},
				required: ['name', 'description'],
			},
			flashCards: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						question: { type: 'string' },
						answer: { type: 'string' },
						difficulty: {
							type: ['string', 'null'],
							enum: ['Easy', 'Medium', 'Hard', null],
						},
					},
					required: ['question', 'answer', 'difficulty'],
				},
			},
		},
		required: ['setDetails', 'flashCards'],
	},
	response: {
		201: {
			type: 'object',
			properties: {
				setDetails: {
					type: 'object',
					properties: {
						setUUID: { type: 'string' },
						name: { type: 'string' },
						description: { type: 'string' },
						createdAt: { type: 'string', format: 'date-time' },
						updatedAt: { type: 'string', format: 'date-time' },
						authorUUID: { type: 'string' },
					},
					required: [
						'setUUID',
						'name',
						'description',
						'createdAt',
						'updatedAt',
						'authorUUID',
					],
				},
				flashCards: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							cardUUID: { type: 'string' },
							question: { type: 'string' },
							answer: { type: 'string' },
							difficulty: {
								type: ['string', 'null'],
								enum: ['Easy', 'Medium', 'Hard', null],
							},
							createdAt: { type: 'string', format: 'date-time' },
							updatedAt: { type: 'string', format: 'date-time' },
							setUUID: { type: 'string' },
						},
						required: [
							'cardUUID',
							'question',
							'answer',
							'difficulty',
							'createdAt',
							'updatedAt',
							'setUUID',
						],
					},
				},
			},
			required: ['setDetails', 'flashCards'],
		},
		400: {
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
		404: {
			type: 'object',
			properties: {
				message: { type: 'string' },
			},
		},
		429: {
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

export default schemaPOSTSets;
