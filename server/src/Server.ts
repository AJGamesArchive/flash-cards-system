// Imports
import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Create API
const server = Fastify({
  logger: true, //TODO Change to false when compiling for production
});

// Create database connection
export const db = new PrismaClient();

// Define GET endpoint
server.get("/", async (req: FastifyRequest, rep: FastifyReply) => {
  console.info(req);
  rep.status(200).send({ message: "Hello, Fastify!" });
  return;
});

// Endpoint to test adding database data
server.post('/addUser', async (req: FastifyRequest, rep: FastifyReply) => {
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
server.get('/getUsers', async (req: FastifyRequest, rep: FastifyReply) => {
  console.log(req);
  const users = await db.users.findMany();
  rep.status(200).send(users);
  return;
});

// Endpoint to test hashing
server.post('/hash', async (req: FastifyRequest, rep: FastifyReply) => {
  const string = req.body as {
    string: string;
  };
  const hashedString: string = await bcrypt.hash(string.string, 10);
  rep.status(201).send({ hashedString: hashedString });
  return;
});

// Start server
server.listen({ port: 80, host: '0.0.0.0' }, (error: Error | null, address: string) => {
  if(error) {
    server.log.error(error);
    db.$disconnect();
    process.exit(1);
  };
  console.log(`API ready on: ${address}`);
});

// Export server object for use in testing
export default server;

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