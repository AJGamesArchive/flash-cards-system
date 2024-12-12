# TestVar - Flash Cards System Monorepo

- API Specification: ``openapi.yaml``
- Pack Manager: [Yarn](https://yarnpkg.com)
- Workspace Manager: [Turborepo](https://turbo.build)
- Client Web App Code: ``./client``
- API Server Code: ``./server``
- Database Schema & Migrations: ``./database``
- Author: **Alex Ward**

## Notes

- Testing is very unfinished and kinda broken as I just ahven't had the time to put into it recently.
- All core data required for the system to function is seeded into the database upon migration.
- Both API & Web Client should be fully featured and working.
- The docker containers are mostly done, however, the server doesn't access the database and I'm not sure if the client can access the API. These containers haven't been tested for over a moth.
- The API will require you to be running **Node v18** as 1 dependency hasen't been updated to Node v20+ yet.

# Setup & Commands

## Setup

- Install Yarn Package Manager: ``npm install -g yarn`` or ``choco install yarn``
- Ensure you're running **NodeJS v18** - *Unfortunately needed for one dependency that is yet to be updated to Node20+*
- Clone Repo: ``git clone https://github.com/AJGamesArchive/flash-cards-system.git``
- Install Dependencies: ``yarn install``
- Create a ``.env`` file in the ``./server`` workspace based off the ``.env.example``
- Create a ``.env`` file in the ``./database`` workspace based off the ``.env.example``
- Create a ``.env`` file in the ``./client`` workspace based off the ``.env.example``
- Init & **Seed** Database: ``yarn db:migrate``
- Run DEV Server(s): ``yarn all:dev``
- - This will run a **client** DEV build on: [localhost:5173](http://localhost:5173)
- - This will run a **server** DEV build on: [localhost:80](http://localhost:80)

## Default Admin Login

*The following account is seeded into the database upon migration.*

- Username: **TestVar Admin**
- Password: **TestVar@395012**

## Commands

### Global

- ``yarn all:build``: Build both the Client and the Server for production.
- ``yarn all:lint``: Run ESLint on both the Client and the Server.
- ``yarn all:dev``: Run DEB builds of both the Client (on port [5173](http://localhost:5173)) and the Server (on port [80](http://localhost:80)).

### Server

- ``yarn server:start``: Run the most recent production build of the server.
- ``yarn server:build``: Build the server for production.
- ``yarn server:dev``: Run a DEV build of the server.
- ``yarn server:lint``: Run ESLint on the server.
- ``yarn server:lint-fix``: Try to fix any present ESLint issues on the server.
- ``yarn server:test``: Run Jest tests on the server.
- ``yarn server:test-majestic``: Run Jest tests on the server using the Majestic UI tool.

### Client

- ``yarn client:build``: Build the client for production.
- ``yarn client:dev``: Run a DEV build of the client on localhost.
- ``yarn client:dev-h``: Run a DEV build of the client on localhost and expose a URL for other devices to connect to the build.
- ``yarn client:lint``: Run ESLint on the client.
- ``yarn client:lint-fix``: Try to fix any present ESLint issues on the client.
- ``yarn client:preview``: Preview the most recent production build of the client.
- ``yarn client:test``: Run tests on the client.
- ``yarn client:test-majestic``: Run tests on the client using the Majestic UI tool.
- ``yarn client:cypress:open``: Open Cypress' GUI and run and monitor e2e and component tests.
- ``yarn client:cypress:run``: Run all Cypress tests in the CLI.

### Database

- ``yarn db:generate``: Generate Prisma Database Client.
- ``yarn db:migrate``: Migrate database to update schema.

### Docker

**NOTE:** *The ``server`` Docker container currently does not access the database properly.*

- ``docker-compose build`` - Build the Docker containers.
- ``docker-compose up --build`` - Build and run all Docker containers.
- ``docker-compose up`` - Start Docker containers without rebuilding.
- ``docker-compose down`` - Stop Docker containers.
- ``docker-compose logs -f <service-name>`` - View logs for a given service.
- - ``<service-name>`` = ``server`` or ``client``.
- ``docker system prune -a`` - Remove all unused Docker; Images, Containers, and Networks from machine.

# Technical Specification

The following section outlines the technology used for client and server code-bases respectively.

## Server

- Language: [TypeScript](https://www.typescriptlang.org/docs/)
- Framework: [Fastify](https://fastify.dev)
- Dev-Tools: [tsc-watch](https://www.npmjs.com/package/tsc-watch)
- Test Framework: [Jest](https://jestjs.io)
- Additional Test Tools: [Majestic](https://github.com/Raathigesh/majestic)
- Code Checker: [ESLint](https://eslint.org)
- Code Formatter: [Prettier](https://prettier.io)

## Client

- Languages: [TypeScript](https://www.typescriptlang.org/docs/) & [JSX/TSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
- Framework: [React](https://reactnative.dev)
- UI Framework: [PrimeReact](https://primereact.org)
- Build Tool: [Vite](https://vite.dev)
- Additional Compiler: [Babel](https://babeljs.io)
- Test Frameworks: [Jest](https://jestjs.io), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), & [Cypress](https://docs.cypress.io/app/get-started/why-cypress)
- Additional Jest Environment: [JSDom](https://www.npmjs.com/package/jest-environment-jsdom)
- Additional Test Tools: [Majestic](https://github.com/Raathigesh/majestic)
- Code Checker: [ESLint](https://eslint.org)

## Database

- ORM: [Prisma](https://pris.ly/d/prisma-schema)
- Database: [SQLite3](https://www.sqlite.org/docs.html)