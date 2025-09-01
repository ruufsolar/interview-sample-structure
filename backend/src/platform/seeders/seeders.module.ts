import { Module } from '@nestjs/common';
import { PlatformModule } from '../platform.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [PlatformModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedersModule {}
