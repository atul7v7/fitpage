// weather.service.ts
import { BadGatewayException, Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { WeatherQueryParamDto } from "./dtos/weather-query-param.dto";
import { EnvService } from "@src/configs/env/services/env.service";
import { OpenWeatherConfig } from "@src/configs/env/open-weather.config";
import { EnvNamespace } from "@src/configs/env/enums/env-namespace.enum";
import { LocationService } from "@modules/user/services/location.service";

@Injectable()
export class WeatherService {
  private logger = new Logger(WeatherService.name);
  constructor(
    private envService: EnvService,
    private locationService: LocationService,
  ) {}

  async getWeatherByLocationId(locationId: number): Promise<any> {
    const location = await this.locationService.getLocationById(locationId);
    const { latitude, longitude } = location;

    const weatherQueryParam = new WeatherQueryParamDto();
    weatherQueryParam.lon = longitude.toString();
    weatherQueryParam.lat = latitude.toString();

    return this.getWeatherData(weatherQueryParam);
  }

  async getWeatherData(weatherQueryParam: WeatherQueryParamDto): Promise<any> {
    try {
   
      const apiUrl = this.prepareOpenWeatherUrl(weatherQueryParam);
      const response = await axios.get(apiUrl);
     
      return response.data;
    } catch (error) {
      this.logger.error("Weather Api call failed", error);
      throw new BadGatewayException("Please try back in sometime");
    }
  }

  private prepareOpenWeatherUrl(
    weatherQueryParam: WeatherQueryParamDto,
  ): string {
    const apiKey = this.envService.getEnvValue<OpenWeatherConfig>(
      EnvNamespace.OPEN_WEATHER_CONFIG,
    ).apiKey;
    const baseUrl = this.envService.getEnvValue<OpenWeatherConfig>(
      EnvNamespace.OPEN_WEATHER_CONFIG,
    ).baseUrl;
   
    const queryParams = this.getQueryParamEmbeddedInUrl(weatherQueryParam);
    return `${baseUrl}${queryParams}&appid=${apiKey}`;
  }

  private getQueryParamEmbeddedInUrl(
    weatherQueryParam: WeatherQueryParamDto,
  ): string {
    let queryParam = "?";
    Object.entries(weatherQueryParam).map(([key, value]) => {
      queryParam = queryParam + `${key}=${value}&`;
    });
    return queryParam.length === 1 ? "" : queryParam.slice(0, -1);
  }
}
