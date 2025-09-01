import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { EntitiesModule } from './entities/entities.module';

@Module({
  exports: [DatabaseModule],
  imports: [
    ConfigModule.forRoot(
      process.env.NODE_ENV === 'production'
        ? {
            ignoreEnvFile: true,
          }
        : {
            envFilePath: ['.env.local', '.env.development'],
            isGlobal: true,
          },
    ),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      inject: [DatabaseService],
      useFactory: async (dbService: DatabaseService) => dbService.getTypeOrmModuleOptions(),
    }),
    DatabaseModule,
    EntitiesModule,
  ],
})
export class PlatformModule {}
