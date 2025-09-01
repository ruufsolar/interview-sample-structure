import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const DATABASE_TYPE = 'postgres';
@Injectable()
export class LocalTypeOrmOptionsService {
  getOptions(): TypeOrmModuleOptions {
    return {
      type: DATABASE_TYPE,
      host: process.env['DATABASE_HOST'],
      port: +(process.env['DATABASE_PORT'] || 15411),
      username: process.env['DATABASE_USER'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      autoLoadEntities: true,
    };
  }
}
