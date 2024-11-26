// Imports
import server from '../src/Server.js';
import buildNum from '../src/static/Build.js';

describe('General Server Ready', () => {
  it('should return active API version', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ version: buildNum });
  });
});