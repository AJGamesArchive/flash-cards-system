// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import updateSetCreationLimitConfig from '../../queries/system-config/UpdateSetCreationLimit.js';
import {
	PATCHSetCreationLimitRequestBody,
	PATCHSetCreationLimitReply200,
	PATCHSetCreationLimitReplyError,
} from '../../schemas/system-config/SchemaPATCHSetCreationLimit.js';
import SystemConfig from '../../types/SystemConfig.js';

/**
 * @protected
 * Route to update the set creation limit
 */
const routePATCHSetCreationLimit = async (
	req: FastifyRequest<{ Body: PATCHSetCreationLimitRequestBody }>,
	rep: FastifyReply,
): Promise<void> => {
	// Update set creation limit
	const updatedConfig: SystemConfig | null = await updateSetCreationLimitConfig(
		req.body.setCreationLimit,
	);
	if (!updatedConfig) {
		rep.status(404).send({
			message: 'Set Creation Limit Config Not Found',
		} as PATCHSetCreationLimitReplyError);
		return;
	}
	rep.status(200).send({
		setCreationLimit: updatedConfig.setCreationLimit,
		creationCounter: updatedConfig.creationCounter,
		date: updatedConfig.currentDate.toISOString(),
	} as PATCHSetCreationLimitReply200);
	return;
};

export default routePATCHSetCreationLimit;
