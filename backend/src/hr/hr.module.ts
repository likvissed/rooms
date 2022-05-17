import { RedisCacheService } from '../shared/redis-cache-service';
import { HrService } from './hr.service';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [],
    providers: [
        HrService,
        RedisCacheService
    ],
    exports: [
        HrService
    ]
})
export class HrModule { }
