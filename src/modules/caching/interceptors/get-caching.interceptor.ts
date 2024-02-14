import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from "@nestjs/common";
import { CachingService } from "../services/caching.service";
import { Observable, tap, of } from "rxjs";
import { Request } from "express";
import {
  CACHE_STATUS_CACHED,
  CACHE_STATUS_HEADER,
} from "../constants/cache.constant";

@Injectable()
export class GetCachingInterceptor implements NestInterceptor {
  constructor(private cachingService: CachingService) {}

  private createCacheKey(request: Request): string {
    const { originalUrl } = request;
    return `get-cache:${originalUrl}`;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    const key = this.createCacheKey(request);

    const cachedData = await this.cachingService.getCache(key);
    if (cachedData) {

      const response = context.switchToHttp().getResponse();

      response.set(CACHE_STATUS_HEADER, CACHE_STATUS_CACHED);

      return of(cachedData);
    }
   
    return next.handle().pipe(
      tap((data) => {
        this.cachingService.setCache(key, data);
      }),
    );
  }
}
