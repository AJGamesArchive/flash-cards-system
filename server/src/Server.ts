// Imports
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Create API
const server = Fastify({
  logger: true, //TODO Change to false when compiling for production
});

// Create database connection
export const db = new PrismaClient();

// Define GET endpoint
server.get("/", async (req, rep) => {
  console.info(req, rep);
  return { message: "Hello, Fastify!" };
});

// Endpoint to test adding database data
server.post('/addUser', async (req, rep) => {
  try {
    const user = req.body as {
      userUUID: string;
      username: string;
      password: string;
      adminFlag: boolean;
    };
    const dbUser = await db.users.create({ data: user });
    rep.status(201).send(dbUser);
    return;
  } catch (error: any) {
    rep.status(500).send({ message: 'Internal Server Error' });
    return;
  };
});

// Endpoint to test fetching database data
server.get('/getUsers', async (req, rep) => {
  console.log(req);
  const users = await db.users.findMany();
  rep.status(200).send(users);
  return;
});

// Endpoint to test hashing
server.post('/hash', async (req, rep) => {
  const string = req.body as {
    string: string;
  };
  const hashedString: string = await bcrypt.hash(string.string, 10);
  rep.status(201).send({ hashedString: hashedString });
  return;
});

// Start server
const start = async () => {
  try {
    await server.listen({ port: 80 });
    console.log(`API ready on: http://localhost:80`);
  } catch (err) {
    server.log.error(err);
    db.$disconnect();
    process.exit(1);
  };
};

// Export server object for use in testing
export default server;

// Function to start the API
start();

// Listen for process termination signals to close the server
process.on('SIGTERM', () => {
  server.close().then(async () => {
    console.log('Server closed!');
    await db.$disconnect();
    process.exit(0);
  });
});
process.on('SIGINT', () => {
  server.close().then(async () => {
    console.log('Server closed!');
    await db.$disconnect();
    process.exit(0);
  });
});