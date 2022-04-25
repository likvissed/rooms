// import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig = require('./ormconfig');

require("dotenv").config({ path: '/app/.env' });

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig[0]),
    HttpModule,
    AuthModule,
    UserModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ]
})

export class AppModule {}
