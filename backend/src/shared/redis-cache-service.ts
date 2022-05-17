import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async get(key) {
    const value = await this.cache.get(key);
    return value;
  }

  /*
    expired - срок действия, в секундах
  */  
  async set(key, value, expired) {
    await this.cache.set(key, value, { ttl: expired });
  }

  async del(key) {
    await this.cache.del(key);
  }

  async reset() {
    await this.cache.reset();
  }
}