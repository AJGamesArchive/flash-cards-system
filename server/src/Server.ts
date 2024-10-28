// Imports
import { default as Fastify } from "fastify";

// Create API
const server = Fastify({
  logger: true, //TODO Change to false when compiling for production
});

// Define GET endpoint
server.get("/", async (req, rep) => {
  return { message: "Hello, Fastify!" };
});

// Start server
const start = async () => {
  try {
    await server.listen({ port: 80 });
    console.log(`API ready on: http://localhost:80`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Export server object for use in testing
export default server;

// Function
start();
