import { IsNumber, IsOptional, IsString } from "class-validator";
import { NumericType } from "typeorm";

export class LocationDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  userId: number;
}
