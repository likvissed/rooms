import { HrModule } from './../hr/hr.module';
import { Role } from './../entities/main/role.entity';
import { UserController } from './user.controller';
import { User } from './../entities/main/user.entity';
import { UserService } from './user.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        HrModule
    ],
    controllers: [
        UserController],
    providers: [UserService],
    exports: [
        UserService,
        TypeOrmModule
    ]
})
export class UserModule { }
