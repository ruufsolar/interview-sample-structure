import { Module } from '@nestjs/common';
import { AwsTypeOrmOptionsService } from './aws-typeorm-options/aws-typeorm-options.service';
import { DatabaseService } from './database.service';
import { LocalTypeOrmOptionsService } from './local-typeorm-options/local-typeorm-options.service';

@Module({
  exports: [DatabaseService],
  providers: [AwsTypeOrmOptionsService, DatabaseService, LocalTypeOrmOptionsService],
})
export class DatabaseModule {}
