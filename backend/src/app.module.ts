import { RedisCacheService } from './shared/redis-cache-service';

import { HrModule } from './hr/hr.module';
// import { UserService } from './user/user.service';
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

require("dotenv").config({ path: '/app/.env' });

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
