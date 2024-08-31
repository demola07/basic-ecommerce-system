import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE,
  NODE_ENV,
  DATABASE_DEBUG,
} from 'src/shared/constants';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isDevelopment = configService.get<string>(NODE_ENV) !== 'production';
  return {
    type: 'postgres',
    host: configService.get<string>(DATABASE_HOST),
    port: configService.get<number>(DATABASE_PORT),
    username: configService.get<string>(DATABASE_USER),
    password: configService.get<string>(DATABASE_PASSWORD),
    database: configService.get<string>(DATABASE),
    synchronize: isDevelopment, // Automatically synchronize entities in development
    entities: isDevelopment
      ? ['./src/**/*.entity.ts'] // Load TypeScript entities in development
      : ['./dist/**/*.entity.js'], // Load compiled JavaScript entities in production
    logging: configService.get<boolean>(DATABASE_DEBUG),
  };
};
