import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { appConfig } from '../../../config/config.default.js';
import { repositorySchemas } from '../../infrastructure/repositories/schemas.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: appConfig.dbUrl,
  entities: repositorySchemas,
  synchronize: true,
  logging: false,
});
