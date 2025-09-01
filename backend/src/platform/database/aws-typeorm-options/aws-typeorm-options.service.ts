import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const DATABASE_TYPE = 'postgres';
const DATABASE_ENV_VAR = 'MONOLITHDBSECRET';

@Injectable()
export class AwsTypeOrmOptionsService {
  getOptions(): TypeOrmModuleOptions {
    const monolithDbParams = process.env[DATABASE_ENV_VAR];
    if (monolithDbParams === undefined) {
      throw `Couldn't find database secrets`
    }
    const monolithDbParamsJson = JSON.parse(monolithDbParams);

    return {
      type: DATABASE_TYPE,
      host: monolithDbParamsJson.host,
      port: monolithDbParamsJson.port,
      username: monolithDbParamsJson.username,
      password: monolithDbParamsJson.password,
      database: monolithDbParamsJson.dbInstanceIdentifier,
      autoLoadEntities: true,
    }
  }
}

export default DATABASE_ENV_VAR;
