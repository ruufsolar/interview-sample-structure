import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SeederService } from "./seeder.service";
import { SeedersModule } from "./seeders.module";

async function bootstrap() {
  NestFactory.createApplicationContext(SeedersModule)
    .then(appContext => {
      const logger = new Logger('Seeding app logger');
      const seeder = appContext.get(SeederService);
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch(error => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
