import { BadRequestException, Injectable } from "@nestjs/common";
import { LocationRepository } from "../repositories/location.repository";
import { LocationEntity } from "../entities/location.entity";
import { LocationDto } from "../dtos/location.dto";
import { UpdateLocationDto } from "../dtos/update-location.dto";
import { ApiTags } from "@nestjs/swagger";
import { ExceptionHandler } from "winston";

@Injectable()
@ApiTags("location")
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async addLocation(locationDto: LocationDto): Promise<LocationEntity> {
    const location = await this.locationRepository
      .getRepository()
      .save(locationDto);
    return location;
  }

  async getAllLocationForUser(userId: number): Promise<LocationEntity[]> {
    const locations = await this.locationRepository
      .getRepository()
      .find({ where: { userId } });
    return locations;
  }

  async getLocationById(locationId: number): Promise<LocationEntity> {
    const location = await this.locationRepository
      .getRepository()
      .findOne({ where: { id: locationId } });
    if (!location) {
      throw new BadRequestException("Invalid location id");
    }
    return location;
  }

  async updateLocation(
    locationId: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<LocationEntity> {
    const location = await this.locationRepository
      .getRepository()
      .findOne({ where: { id: locationId } });

    if (!location) {
      throw new BadRequestException("Invalid location id");
    }

    const locationEntityObj = new LocationEntity();
    Object.assign(locationEntityObj, updateLocationDto);
    return this.locationRepository.getRepository().save(locationEntityObj);
  }

  async deleteLocation(locationId: number) {
    const deleted = await this.locationRepository
      .getRepository()
      .delete({ id: locationId });
    if (deleted.affected) {
      return "Deleted successfully";
    } else {
      throw new BadRequestException("Invalid location id");
    }
  }
}
