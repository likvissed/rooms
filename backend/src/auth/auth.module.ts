import { RolesGuard } from './guards/roles.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { AuthController } from './auth.controller';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import AuthService from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';

require('dotenv-expand').expand(require("dotenv").config({ path: '/app/.env' }));

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {expiresIn: '12h'}
    }),
    forwardRef(() => UserModule),
    PassportModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  controllers: [
    AuthController
  ],
  exports: [AuthService, PassportModule]
})

export class AuthModule {}
