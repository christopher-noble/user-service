import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { appConfig } from '../../../config/config.default.js';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: appConfig.dbUrl });
export const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
