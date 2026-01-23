import 'reflect-metadata';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { parse } from 'graphql';
import { readFileSync } from 'node:fs';

import { resolvers } from './application/api/customer/resolvers/index.js';
import { registerDependencies } from './configuration/dependency-registry/index.js';
import { createContext } from './application/api/customer/customer-context.js';
import { initDatabase } from './configuration/database/index.js';

const typeDefs = parse(
    readFileSync(new URL('../src/application/api/customer/customer-schema.graphql', import.meta.url), 'utf8')
);

const schema = buildSubgraphSchema({ typeDefs, resolvers });

async function bootstrap() {
  await initDatabase();
  registerDependencies();

  const yoga = createYoga({
    schema,
    context: createContext,
    graphqlEndpoint: '/graphql',
  });

  const server = createServer(yoga);
  const PORT = process.env.PORT || 4001;

  server.listen(PORT, () => {
    console.log(
      `🚀 Subgraph "customer" ready at http://localhost:${PORT}/graphql`,
    );
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  process.exitCode = 1;
});