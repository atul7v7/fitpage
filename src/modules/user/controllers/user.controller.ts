import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { SuccessResponse } from "@src/utils/response/interfaces/success-response.interface";
import { UserDto } from "../dtos/user.dto";
import { ResponseHandler } from "@src/utils/response/response-handler";
import { UserEntity } from "../entities/user.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() userDto: UserDto,
  ): Promise<SuccessResponse<UserEntity>> {
    const user = await this.userService.createUser(userDto);
    return ResponseHandler.success(user);
  }

  @Get()
  @ApiOperation({ description: "Get all users" })
  async getAllUsers(): Promise<SuccessResponse<UserDto[]>> {
    const users = await this.userService.getAllUsers();
    return ResponseHandler.success(users);
  }

  @Get("/:userId")
  async getUserById(
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<SuccessResponse<UserDto>> {
    const users = await this.userService.getUserByIdOrThrow(userId);
    return ResponseHandler.success(users);
  }
}
