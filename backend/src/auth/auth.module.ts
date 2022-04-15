import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AuthService from './auth.service';
import { HttpModule } from '@nestjs/axios';

require('dotenv-expand').expand(require("dotenv").config({ path: '/app/.env' }));

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {expiresIn: '60s'}
    })],
  providers: [AuthService],
  controllers: [
    AuthController
  ],
  exports: [AuthService]
})

export class AuthModule {}
