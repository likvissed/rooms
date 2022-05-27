import { AuthModule } from './../auth/auth.module';
import { HrModule } from './../hr/hr.module';
import { RoleEntity } from './../entities/main/role.entity';
import { UserController } from './user.controller';
import { UserEntity } from './../entities/main/user.entity';
import { UserService } from './user.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
        HrModule,
        AuthModule
    ],
    controllers: [
        UserController],
    providers: [
        UserService
    ],
    exports: [
        UserService,
        TypeOrmModule
    ]
})
export class UserModule { }
