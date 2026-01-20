import type { DependencyContainer } from 'tsyringe';
import { container } from 'tsyringe';

import { GetHelloProviderAdapter } from '../../domain/providers/get-hello/get.hello.provider.js';
import { ProviderTokens } from './tokens/provider-tokens.js';

export function registerProviders(registry: DependencyContainer = container) {
  registry.registerSingleton(
    ProviderTokens.GetHelloProvider,
    GetHelloProviderAdapter,
  );

  return registry;
}

