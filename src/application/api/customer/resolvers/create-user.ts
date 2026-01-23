import { ProviderTokens } from '../../../../configuration/dependency-registry/tokens/provider-tokens.js';
import type { CreateUserProviderPort } from '../../../../domain/providers/create-user/create-user.port.js';
import { CustomerContext } from '../customer-context.js';

export interface CreateUserArgs {
  input: {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    secondaryEmail?: string | null;
  };
}

export const createUserResolver = {
  async createUser(
    _: unknown,
    args: CreateUserArgs,
    context: CustomerContext,
  ) {
    const provider = context.container.resolve<CreateUserProviderPort>(
      ProviderTokens.CreateUserProvider,
    );

    return provider.execute(args.input);
  },
};
