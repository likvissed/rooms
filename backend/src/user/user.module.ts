import { User } from './../entities/main/user.entity';
import { UserService } from './user.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService, TypeOrmModule]
})
export class UserModule { }
