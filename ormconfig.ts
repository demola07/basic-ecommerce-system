// import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

// const rootDir: string = __dirname;

// const migrationsDir = path.join(rootDir, '../../migrations');

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: true,
  dropSchema: false,
  logging: true,
  logger: 'file',
  entities: ['dist/**/**/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  migrationsTransactionMode: 'each',
  // migrationsTableName: 'migration_table',
});
