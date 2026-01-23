import type { User } from '../entities/user.js';

export interface UserRepositoryPort {
  create(user: Omit<User, 'id'>): Promise<User>;
  findById(id: string): Promise<User | null>;
}
