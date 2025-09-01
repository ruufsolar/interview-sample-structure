import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import DATABASE_ENV_VAR, { AwsTypeOrmOptionsService } from './aws-typeorm-options/aws-typeorm-options.service';
import { LocalTypeOrmOptionsService } from './local-typeorm-options/local-typeorm-options.service';

const AUTO_LOAD_ENTITIES = true;

@Injectable()
export class DatabaseService {
  constructor(
    private readonly awsService: AwsTypeOrmOptionsService,
    private readonly localService: LocalTypeOrmOptionsService,
  ) { }

  getTypeOrmModuleOptions(): TypeOrmModuleOptions {
    const typeOrmOptions: TypeOrmModuleOptions =
      (process.env[DATABASE_ENV_VAR] !== undefined) ?
        this.awsService.getOptions() :
        this.localService.getOptions();

    return {
      autoLoadEntities: AUTO_LOAD_ENTITIES,
      ...typeOrmOptions,
    };
  }
}
