// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import getSetCreationLimitConfig from '../../queries/system-config/GetSetCreationLimitConfig.js';
import {
	GETSetCreationLimitReply200,
	GETSetCreationLimitReplyError,
} from '../../schemas/system-config/SchemaGETSetCreationLimit.js';
import SystemConfig from '../../types/SystemConfig.js';

/**
 * @protected
 * Route to get the current set creation limit and the current set creation count
 */
const routeGETSetCreationLimit = async (
	_req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch and return set creation limit
	const config: SystemConfig | null = await getSetCreationLimitConfig();
	if (!config) {
		rep.status(404).send({
			message: 'Set Creation Limit Config Not Found',
		} as GETSetCreationLimitReplyError);
		return;
	}
	rep.status(200).send({
		setCreationLimit: config.setCreationLimit,
		creationCounter: config.creationCounter,
	} as GETSetCreationLimitReply200);
	return;
};

export default routeGETSetCreationLimit;
