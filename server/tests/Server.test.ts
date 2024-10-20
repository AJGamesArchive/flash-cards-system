import server from '../src/Server'

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
  it('should return a 200 status code for the root endpoint', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    });
    
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: "Hello, Fastify!" });
  });
});