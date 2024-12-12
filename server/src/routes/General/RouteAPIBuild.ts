// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

import { APIBuildReply } from '../../schemas/General/SchemaAPIBuild.js';
import buildNum from '../../static/Build.js';

/**
 * Route to return active API version
 */
const routeAPIBuild = async (
	_req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	rep.status(200).send({
		version: buildNum,
	} as APIBuildReply);
	return;
};

export default routeAPIBuild;
