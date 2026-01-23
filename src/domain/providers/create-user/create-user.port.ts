import type { User } from '../../entities/user.js';

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail?: string | null;
};

export interface CreateUserProviderPort {
  execute(input: CreateUserInput): Promise<User>;
}
