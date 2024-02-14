import { IsNumber, IsOptional, IsString } from "class-validator";

export class WeatherQueryParamDto {
  @IsString()
  @IsOptional()
  lat?: string;
  @IsString()
  @IsOptional()
  lon?: string;
  @IsString()
  @IsOptional()
  mode?: string;
  @IsString()
  @IsOptional()
  lang?: string;
}
