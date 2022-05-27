import { RedisCacheService } from './shared/redis-cache-service';

import { HrModule } from './hr/hr.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig = require('./ormconfig');

import * as redisStore from 'cache-manager-redis-store';

import { I18nModule } from 'nestjs-i18n';

require("dotenv").config({ path: '/app/.env' });
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig[0]),
    HttpModule,
    AuthModule,
    UserModule,
    HrModule,
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true
      }
    })
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    RedisCacheService
  ]
})

export class AppModule { }
