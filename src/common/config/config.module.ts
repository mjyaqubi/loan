import { Module } from '@nestjs/common';
import { configProvider } from './config.provider';
import { ConfigService } from './config.service';

@Module({
  providers: [configProvider, ConfigService],
  exports: [configProvider, ConfigService],
})
export class ConfigModule {}
