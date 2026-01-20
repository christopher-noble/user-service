import 'reflect-metadata';

import { container as rootContainer, type DependencyContainer } from 'tsyringe';

export type GraphQLContext = {
  request: Request;
  /** Optional request correlation id (e.g. from gateway) */
  requestId?: string;
  /** Optional authenticated user id (if your gateway/auth sets it) */
  userId?: string;
  container: DependencyContainer;
};

export function createContext({ request }: { request: Request }): GraphQLContext {
  // Request-scoped container (no cross-request state)
  const container = rootContainer.createChildContainer();
  const requestId = request.headers.get('x-request-id') ?? undefined;
  const userId = request.headers.get('x-user-id') ?? undefined;

  return { request, requestId, userId, container };
}

