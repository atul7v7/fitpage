import { Module } from "@nestjs/common";

import { CacheModule } from "@nestjs/cache-manager";
import { CachingService } from "./services/caching.service";
import { GetCachingInterceptor } from "./interceptors/get-caching.interceptor";
import { EnvModule } from "@src/configs/env/env.module";

@Module({
  imports: [CacheModule.register(), EnvModule],
  providers: [CachingService, GetCachingInterceptor],
  exports: [CachingService, GetCachingInterceptor],
})
export class CachingModule {}
