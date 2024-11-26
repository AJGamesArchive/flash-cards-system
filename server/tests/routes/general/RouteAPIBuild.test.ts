import routeAPIBuild from '../../../src/routes/general/RouteAPIBuild.js';
import buildNum from '../../../src/static/Build.js';
import { FastifyRequest, FastifyReply } from 'fastify';

describe('routeAPIBuild', () => {
  let req: FastifyRequest;
  let rep: FastifyReply;

  beforeEach(() => {
    req = {} as FastifyRequest;

    rep = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  it('should return 200 status and the correct build number', async () => {
    await routeAPIBuild(req, rep);

    expect(rep.status).toHaveBeenCalledWith(200);
    expect(rep.send).toHaveBeenCalledWith({
      version: buildNum,
    });
  });
});