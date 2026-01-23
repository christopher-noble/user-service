import { Client } from 'pg';
import type { DataSource } from 'typeorm';

import { appConfig } from '../../../config/config.default.js';
import { AppDataSource } from './data-source.js';

let initialization: Promise<DataSource> | null = null;

async function createDbsForNewRepositories(): Promise<void> {
  const url = new URL(appConfig.dbUrl);
  const dbName = url.pathname.slice(1); // Remove leading '/'
  const adminUrl = `${url.protocol}//${url.username}:${url.password}@${url.hostname}:${url.port}/postgres`;

  const client = new Client({ connectionString: adminUrl });

  try {
    await client.connect();

    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName],
    );

    if (result.rows.length === 0) {
      const escapedDbName = `"${dbName.replace(/"/g, '""')}"`;
      await client.query(`CREATE DATABASE ${escapedDbName}`);
      console.log(`✅ Created database: ${dbName}`);
    }
  } finally {
    await client.end();
  }
}

export async function initDatabase(): Promise<DataSource> {
  if (!initialization) {
    initialization = (async () => {
      try {
        await createDbsForNewRepositories();
        return await AppDataSource.initialize();
      } catch (error: any) {
        const url = new URL(appConfig.dbUrl);
        const sanitizedUrl = `postgres://${url.username}:***@${url.hostname}:${url.port}/${url.pathname}`;

        if (error.code === '28P01') {
          console.error(`❌ Database authentication failed. ${error.code}, message: ${error.message}`);
        }
        throw error;
      }
    })();
  }

  return initialization;
}
