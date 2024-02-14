import { AppConfig } from "./app.config";
import { OpenWeatherConfig } from "./open-weather.config";
import { RateLimitterConfig } from "./rate-limitter.config";
export interface EnvConfig {
  APP_CONFIG: AppConfig;
  RATE_LIMITTER_CONFIG: RateLimitterConfig;
  OPEN_WEATHER_CONFIG: OpenWeatherConfig;
}
