import { loginResolver } from './login.js';
import { logoutResolver } from './logout.js';

export const resolvers = {
  Query: {
    hello: () => 'Hey',
  },
  Mutation: {
    ...loginResolver,
    ...logoutResolver,
  },
};

