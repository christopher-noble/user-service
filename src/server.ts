import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { parse } from 'graphql';
import { readFileSync } from 'node:fs';

import { resolvers } from './application/api/customer/resolvers/index.js';
import { createContext } from './context.js';

const typeDefs = parse(
    readFileSync(new URL('./schema.graphql', import.meta.url), 'utf8')
);

const schema = buildSubgraphSchema({ typeDefs, resolvers });

const yoga = createYoga({
    schema,
    context: createContext,
    graphqlEndpoint: '/graphql',
});

const server = createServer(yoga);
const PORT = process.env.PORT || 4001;

server.listen(PORT, () => {
    console.log(`🚀 Subgraph "customer" ready at http://localhost:${PORT}/graphql`);
});