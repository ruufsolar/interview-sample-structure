import { Test, TestingModule } from '@nestjs/testing';
import { LocalTypeOrmOptionsService } from './local-typeorm-options.service';

describe('LocalTypeOrmOptionsService', () => {
  const env = process.env;
  let service: LocalTypeOrmOptionsService;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };

    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalTypeOrmOptionsService],
    }).compile();
    service = module.get<LocalTypeOrmOptionsService>(LocalTypeOrmOptionsService);
  });

  afterEach(() => {
    process.env = env;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getOptions', () => {
    beforeAll(() => {
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
      expect(service.getOptions()).toEqual(expected);
    });
  });
});
