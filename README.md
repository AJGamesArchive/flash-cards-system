# TestVar - Flash Cards System Monorepo

- API Specification: ``openapi.yaml``
- Pack Manager: [Yarn](https://yarnpkg.com)
- Workspace Manager: [Turborepo](https://turbo.build)
- Client Web App Code: ``./client``
- API Server Code: ``./server``
- Database Schema & Migrations: ``./database``
- Author: **Alex Ward**

# Setup & Commands

## Setup

- Install Yarn Package Manager: ``npm install -g yarn`` or ``choco install yarn``
- Ensure you're running **NodeJS v18**
- Clone Repo: ``git clone <repo-link>``
- Install Dependencies: ``yarn install``
- Create a ``.env`` file in the ``./server`` workspace:

```bash
$ cd server
$ touch .env
```

- Add the following ENV to ``./server/.env``:

```env
JWT_SECRET=9jzInZSfM3UbtdL1J1cbm20dy6VqvrfLtzQHFZxv
```

- Create a ``.env`` file in the ``./database`` workspace: 

```bash
$ cd database
$ touch .env
```

- Add the following ENV to ``./database/.env``:

```env
DATABASE_URL="file:./dev.db"
```

- Init Database: ``yarn db:migrate``
- Run DEV Server(s): ``yarn all:dev``
- - This will run a **client** DEV build on: [localhost:5173](http://localhost:5173)
- - This will run a **server** DEV build on: [localhost:80](http://localhost:80)

## Default Admin Login

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
- Test Frameworks: [Jest](https://jestjs.io) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Additional Jest Environment: [JSDom](https://www.npmjs.com/package/jest-environment-jsdom)
- Additional Test Tools: [Majestic](https://github.com/Raathigesh/majestic)
- Code Checker: [ESLint](https://eslint.org)

## Database

- DBMS: [Prisma](https://pris.ly/d/prisma-schema)
- Database: [SQLite3](https://www.sqlite.org/docs.html)