import { IsArray, IsOptional } from "class-validator";

// Explicit type aliases for clarity and potential validation
export type OpeningTime = string;
export type ClosingTime = string;
export type OpeningClosingTime = [OpeningTime, ClosingTime];

export class Timing {
  @IsOptional()
  @IsArray()
  MON?: OpeningClosingTime;

  @IsOptional()
  @IsArray()
  TUE?: OpeningClosingTime;

  @IsOptional()
  @IsArray()
  WED?: OpeningClosingTime;

  @IsOptional()
  @IsArray()
  THU?: OpeningClosingTime;

  @IsOptional()
  @IsArray()
  FRI?: OpeningClosingTime;

  @IsOptional()
  @IsArray()
  SAT?: OpeningClosingTime;

  @IsOptional()
  @IsArray()
  SUN?: OpeningClosingTime;
}
