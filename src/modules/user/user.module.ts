import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { LocationEntity } from "./entities/location.entity";
import { UserRepository } from "./repositories/user.repository";
import { LocationRepository } from "./repositories/location.repository";
import { getMysqlDataSource } from "@modules/database/data-source";
import { UserController } from "./controllers/user.controller";
import { LocationController } from "./controllers/location.controller";
import { UserService } from "./services/user.service";
import { LocationService } from "./services/location.service";
import { WeatherService } from "@modules/weather/weather.service";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [UserEntity, LocationEntity],
      getMysqlDataSource(),
    ),
  ],
  controllers: [UserController, LocationController],
  providers: [UserRepository, LocationRepository, UserService, LocationService],
  exports: [LocationService],
})
export class UserModule {}
