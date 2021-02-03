import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { LoggerModule } from './common/logger/logger.module';
import { LoanModule } from './loans/loans.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    AppModule,
    LoanModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
