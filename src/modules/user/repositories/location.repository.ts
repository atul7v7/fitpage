import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { getMysqlDataSource } from "@modules/database/data-source";
import { BaseRepository } from "@src/utils/repositories/base-repository";
import { LocationEntity } from "../entities/location.entity";

@Injectable()
export class LocationRepository extends BaseRepository<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity, getMysqlDataSource())
    private repository: Repository<LocationEntity>,
  ) {
    super(repository);
  }
}
