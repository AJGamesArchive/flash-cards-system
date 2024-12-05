// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import updateCreationCounterConfig from '../../queries/system-config/UpdateCreationCounter.js';
import { DELETECreationCounterReplyError } from '../../schemas/system-config/SchemaDELETECreationCounter.js';
import SystemConfig from '../../types/SystemConfig.js';

/**
 * @protected
 * Route to reset the user set creation counter for the day
 */
const routeDELETECreationCounter = async (
	_req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	// Update set creation counter
	const updatedConfig: SystemConfig | null =
		await updateCreationCounterConfig(0);
	if (!updatedConfig) {
		rep.status(404).send({
			message: 'Set Creation Limit Config Not Found',
		} as DELETECreationCounterReplyError);
		return;
	}
	rep.status(204).send({});
	return;
};

export default routeDELETECreationCounter;
