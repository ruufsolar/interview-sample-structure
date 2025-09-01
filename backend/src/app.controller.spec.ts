import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

describe('AppController', () => {
  const env = process.env;
  let appController: AppController;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: DataSource,
          useValue: {
            isInitialized: true,
            entityMetadatas: [],
          },
        },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  afterEach(() => {
    process.env = env;
  });

  describe('root', () => {
    process.env['THE_ONE_WHO_ROCKS'] = 'Drakkar';
    it('should return welcome message', async () => {
      expect(await appController.getHello()).toBe('Drakkar Rocks! DB connection was successful :)');
    });
  });
});
