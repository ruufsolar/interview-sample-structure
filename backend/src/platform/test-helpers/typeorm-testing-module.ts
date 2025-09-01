import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { EntitySchema, MixedList } from 'typeorm';

type TypeOrmTestingModuleInput = {
  entities: MixedList<string | Function | EntitySchema<any>>;
};

export const TypeOrmTestingModule = (typeOrmTestingModuleInput: TypeOrmTestingModuleInput) => {
  const { entities } = typeOrmTestingModuleInput;

  return [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DATABASE_HOST'],
      port: +(process.env['DATABASE_PORT'] || 15411),
      username: process.env['DATABASE_USER'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      dropSchema: true,
      synchronize: true,
      entities: entities,
    }),
    TypeOrmModule.forFeature(entities as EntityClassOrSchema[]),
  ];
};
