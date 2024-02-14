import { BadRequestException, Injectable } from "@nestjs/common";
import { LocationEntity } from "../entities/location.entity";
import { LocationDto } from "../dtos/location.dto";
import { UpdateLocationDto } from "../dtos/update-location.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { UserDto } from "../dtos/user.dto";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.getRepository().save(userDto);
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const user = await this.userRepository.getRepository().find();
    return user;
  }

  async getUserByIdOrThrow(userId: number): Promise<UserEntity> {
    const user = await this.userRepository
      .getRepository()
      .findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException("Invalid user id");
    }
    return user;
  }

  async updateUser(updateUserDto: UserDto): Promise<UserEntity> {
    const user = await this.userRepository
      .getRepository()
      .findOne({ where: { id: updateUserDto.id } });

    if (!user) {
      throw new BadRequestException("Invalid location id");
    }

    const userEntityOnj = new UserEntity();
    Object.assign(userEntityOnj, updateUserDto);
    return this.userRepository.getRepository().save(userEntityOnj);
  }

  async deleteLocation(userId: number) {
    const deleted = await this.userRepository
      .getRepository()
      .delete({ id: userId });
  }
}
