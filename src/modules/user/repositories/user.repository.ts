import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { getMysqlDataSource } from "@modules/database/data-source";
import { BaseRepository } from "@src/utils/repositories/base-repository";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity, getMysqlDataSource())
    private repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
