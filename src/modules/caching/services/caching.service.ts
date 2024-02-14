import { Injectable, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { EnvService } from "@src/configs/env/services/env.service";
import { AppConfig } from "@src/configs/env/app.config";
import { EnvNamespace } from "@src/configs/env/enums/env-namespace.enum";

@Injectable()
export class CachingService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private envService: EnvService,
  ) {}

  async getCache<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get(key);
  }

  async setCache(key: string, value: string): Promise<void> {
    const ttl = this.envService.getEnvValue<AppConfig>(
      EnvNamespace.APP_CONFIG,
    ).cachingTtl;
    return await this.cacheManager.set(key, value, ttl);
  }

  async deleteCache(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }
}
