import { inject, injectable } from 'tsyringe';

import type { User } from '../../entities/user.js';
import type { UserRepositoryPort } from '../../repositories/user-repository.port.js';
import {
    CreateUserProviderPort,
    type CreateUserInput,
} from './create-user.port.js';
import { RepositoryTokens } from '../../../configuration/dependency-registry/tokens/repository-tokens.js';

@injectable()
export class CreateUserProviderAdapter implements CreateUserProviderPort {
    constructor(
        @inject(RepositoryTokens.UserRepository)
        private userRepository: UserRepositoryPort,
    ) { }

    public async execute(input: CreateUserInput): Promise<User> {
        return this.userRepository.create({
            firstName: input.firstName,
            lastName: input.lastName,
            primaryEmail: input.primaryEmail,
            secondaryEmail: input.secondaryEmail ?? null,
        });
    }
}
