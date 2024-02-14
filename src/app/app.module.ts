import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "@modules/database/database.module";

import { EnvModule } from "../configs/env/env.module";
import { Throttler } from "../configs/gaurds/rate-limiter.gaurd";

import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "@src/utils/exceptions/http-exception";
import { DatabaseExceptionFilter } from "@src/utils/exceptions/database-exception";
import { Logger } from "winston";
import { UserModule } from "@modules/user/user.module";
import { WeatherModule } from "@modules/weather/weather.module";

@Module({
  imports: [Throttler, EnvModule, DatabaseModule, UserModule, WeatherModule],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
