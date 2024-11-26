import server from "../src/Server.js";

beforeAll(async () => {
  await server.ready();
});

afterAll(async () => {
  await server.close();
});