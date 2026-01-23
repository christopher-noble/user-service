import { v7 as uuidv7 } from 'uuid';
import { injectable } from 'tsyringe';
import type { Repository } from 'typeorm';

import type { User } from '../../../domain/entities/user.js';
import type { UserRepositoryPort } from '../../../domain/repositories/user-repository.port.js';
import { AppDataSource } from '../../../configuration/database/data-source.js';
import { UserSchema } from './user-repository.schema.js';

@injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  private readonly repository: Repository<UserSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserSchema);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const entity = this.repository.create({
      id: uuidv7(),
      ...user,
      secondaryEmail: user.secondaryEmail ?? null,
    });

    const saved = await this.repository.save(entity);

    return {
      id: saved.id,
      firstName: saved.firstName,
      lastName: saved.lastName,
      primaryEmail: saved.primaryEmail,
      secondaryEmail: saved.secondaryEmail,
    };
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      primaryEmail: entity.primaryEmail,
      secondaryEmail: entity.secondaryEmail,
    };
  }
}
