import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;
}
