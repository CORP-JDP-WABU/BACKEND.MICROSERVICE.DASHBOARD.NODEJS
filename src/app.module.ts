import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as schemas from 'src/common/schemas';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { SecurityModule } from './common/client/security/security.module';
import { CryptoModule } from './common/crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    SecurityModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('client.security'),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('mongodb'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: schemas.Dashboards.name,
        schema: schemas.DashboardsSchema,
      },
      {
        name: schemas.Universities.name,
        schema: schemas.UniversitiesSchema,
      },
      {
        name: schemas.Students.name,
        schema: schemas.StudentsSchema,
      },
    ]),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('http.throttle.ttl'),
        limit: config.get('http.throttle.limit'),
      }),
    }),
    CryptoModule
  ],
  controllers: [AppController, DashboardController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    DashboardService,
  ],
})
export class AppModule {}
