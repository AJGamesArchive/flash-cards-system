// Imports
import server from '../src/Server.js';
import buildNum from '../src/static/Build.js';

// Endpoint tests
describe('API Endpoints', () => {
  // Start server before testing
  beforeAll(async () => {
    await server.ready();
  });

  // Close server after testing
  afterAll(async () => {
    await server.close();
  });

  // Test root endpoint
  it('should return active API version', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ version: buildNum });
  });
});