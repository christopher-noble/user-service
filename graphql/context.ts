import 'reflect-metadata';

import { container as rootContainer, type DependencyContainer } from 'tsyringe';

export type GraphQLContext = {
  request: Request;
  requestId?: string;
  userId?: string;
  container: DependencyContainer;
};

export function createContext({ request }: { request: Request }): GraphQLContext {
  const container = rootContainer.createChildContainer();
  const requestId = request.headers.get('x-request-id') ?? undefined;
  const userId = request.headers.get('x-user-id') ?? undefined;

  return { request, requestId, userId, container };
}

