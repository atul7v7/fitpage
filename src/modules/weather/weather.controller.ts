// weather.controller.ts
import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { WeatherQueryParamDto } from "./dtos/weather-query-param.dto";
import { GetCachingInterceptor } from "@modules/caching/interceptors/get-caching.interceptor";
import { ApiRequestInterceptor } from "./interceptors/weather-api-request.interceptor";
import { ApiTags } from "@nestjs/swagger";

@Controller("weather")
@UseInterceptors(GetCachingInterceptor)
@UseInterceptors(ApiRequestInterceptor)
@ApiTags("Weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getCurrentWeather(
    @Query() weatherQueryParamDto: WeatherQueryParamDto,
  ): Promise<any> {
    const weatherData =
      await this.weatherService.getWeatherData(weatherQueryParamDto);
    return { success: true, data: weatherData };
  }

  @Get(":locationId")
  async getCurrentWeatherByLocationId(
    @Param("locationId", ParseIntPipe) locationId: number,
  ): Promise<any> {
    try {
      const weatherData =
        await this.weatherService.getWeatherByLocationId(locationId);
      return { success: true, data: weatherData };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
