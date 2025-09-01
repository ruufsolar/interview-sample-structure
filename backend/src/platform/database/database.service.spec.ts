import { Test, TestingModule } from '@nestjs/testing';
import { AwsTypeOrmOptionsService } from './aws-typeorm-options/aws-typeorm-options.service';
import { DatabaseService } from './database.service';
import { LocalTypeOrmOptionsService } from './local-typeorm-options/local-typeorm-options.service';

describe('DatabaseService', () => {
  const env = process.env;
  let service: DatabaseService;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };

    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, AwsTypeOrmOptionsService, LocalTypeOrmOptionsService],
    }).compile();
    service = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    process.env = env;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getOptions', () => {
    describe('development environment', () => {
      beforeAll(() => {
        delete process.env['TESTING_DATABASE'];
        process.env['DATABASE_HOST'] = 'ozzy.cl';
        process.env['DATABASE_PORT'] = '15411';
        process.env['DATABASE_USER'] = 'ozzy';
        process.env['DATABASE_PASSWORD'] = 'drakkariscrazy';
        process.env['DATABASE_NAME'] = 'dogfood';
      });

      it('returns expected options', async () => {
        const expected = {
          type: 'postgres',
          host: 'ozzy.cl',
          port: 15411,
          username: 'ozzy',
          password: 'drakkariscrazy',
          database: 'dogfood',
          autoLoadEntities: true,
        };

        expect(service.getTypeOrmModuleOptions()).toEqual(expected);
      });
    });

    describe('production environment', () => {
      beforeAll(() => {
        delete process.env['TESTING_DATABASE'];
        process.env[
          'MONOLITHDBSECRET'
        ] = `{"username":"ozzy","password":"drakkariscrazy","engine":"postgres","host":"ozzy.cl","port":15411,"dbInstanceIdentifier":"dogfood"}`;
      });

      it('returns expected options', async () => {
        const expected = {
          type: 'postgres',
          host: 'ozzy.cl',
          port: 15411,
          username: 'ozzy',
          password: 'drakkariscrazy',
          database: 'dogfood',
          autoLoadEntities: true,
        };

        expect(service.getTypeOrmModuleOptions()).toEqual(expected);
      });
    });
  });
});
