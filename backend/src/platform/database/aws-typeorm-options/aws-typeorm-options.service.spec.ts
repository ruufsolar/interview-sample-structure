import { Test, TestingModule } from '@nestjs/testing';
import { AwsTypeOrmOptionsService } from './aws-typeorm-options.service';

describe('AwsTypeOrmOptionsService', () => {
  let service: AwsTypeOrmOptionsService;
  const env = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsTypeOrmOptionsService],
    }).compile();
    service = module.get<AwsTypeOrmOptionsService>(AwsTypeOrmOptionsService);
  });

  afterEach(() => {
    process.env = env;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getOptions', () => {
    beforeAll(() => {
      const mockEnvVar = `{"username":"ozzy","password":"drakkariscrazy","engine":"postgres","host":"ozzy.cl","port":15411,"dbInstanceIdentifier":"dogfood"}`;
      process.env['MONOLITHDBSECRET'] = mockEnvVar;
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
