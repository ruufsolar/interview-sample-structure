import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AwsTypeOrmOptionsService } from "./aws-typeorm-options/aws-typeorm-options.service";
import { DatabaseService } from "./database.service";
import { LocalTypeOrmOptionsService } from "./local-typeorm-options/local-typeorm-options.service";

if (process.env.DATABASE_HOST === undefined) {
  require('dotenv').config({ path: '.env.development' });
}

const awsService = new AwsTypeOrmOptionsService();
const localService = new LocalTypeOrmOptionsService();
const dbService = new DatabaseService(awsService, localService);
const options: TypeOrmModuleOptions = dbService.getTypeOrmModuleOptions();

export default new DataSource({
  ...(options as any),
  entities: ['**/entities/*js'],
  migrations: ['**/migrations/*.js'],
});
