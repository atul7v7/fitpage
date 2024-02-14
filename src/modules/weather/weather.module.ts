// weather.module.ts
import { Module } from "@nestjs/common";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";
import { EnvModule } from "@src/configs/env/env.module";
import { CachingModule } from "@modules/caching/caching.module";
import { UserModule } from "@modules/user/user.module";

@Module({
  imports: [EnvModule, CachingModule, UserModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
