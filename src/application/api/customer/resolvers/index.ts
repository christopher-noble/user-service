import { loginResolver } from './login.js';
import { logoutResolver } from './logout.js';
import { createUserResolver } from './create-user.js';

export const resolvers = {
  Query: {
    hello: () => 'Hey',
  },
  Mutation: {
    createUser: createUserResolver.createUser,
    login: loginResolver.login,
    logout: logoutResolver.logout,
  }
};

