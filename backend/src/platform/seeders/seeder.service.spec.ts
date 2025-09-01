import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from '../test-helpers/typeorm-testing-module';
import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...TypeOrmTestingModule({
          entities: [],
        }),
      ],
      providers: [SeederService],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run', async () => {
    await service.seed();
  });
});
