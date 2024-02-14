import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { LocationService } from "../services/location.service";
import { SuccessResponse } from "@src/utils/response/interfaces/success-response.interface";
import { LocationEntity } from "../entities/location.entity";
import { ResponseHandler } from "@src/utils/response/response-handler";
import { LocationDto } from "../dtos/location.dto";
import { UpdateLocationDto } from "../dtos/update-location.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("location")
@ApiTags("location")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get("/user/:userId")
  @ApiOperation({ description: "Get all saved location of a user" })
  async getUserAllLocations(
    @Param("userId", ParseIntPipe) userId: number,
  ): Promise<SuccessResponse<LocationEntity[]>> {
    const locations = await this.locationService.getAllLocationForUser(userId);
    return ResponseHandler.success<LocationEntity[]>(locations);
  }

  @Get("/:locationId")
  @ApiOperation({ description: "Get location detail by location id" })
  async getLocationById(
    @Param("locationId", ParseIntPipe) locationId: number,
  ): Promise<SuccessResponse<LocationEntity>> {
    const locations = await this.locationService.getLocationById(locationId);
    return ResponseHandler.success<LocationEntity>(locations);
  }

  @Post()
  @ApiOperation({
    description:
      "Create location for a user, please provide with valid user id",
  })
  async createLocation(
    @Body() locationDto: LocationDto,
  ): Promise<SuccessResponse<LocationEntity>> {
    const locations = await this.locationService.addLocation(locationDto);
    return ResponseHandler.success<LocationEntity>(locations);
  }

  @Put(":locationId")
  async updateLocation(
    @Param("locationId", ParseIntPipe) locationId: number,
    @Body() updateLocation: UpdateLocationDto,
  ): Promise<SuccessResponse<LocationEntity>> {
    const updatedLocation = await this.locationService.updateLocation(
      locationId,
      updateLocation,
    );
    return ResponseHandler.success(updatedLocation);
  }

  @Delete(":locationId")
  async deleteLocation(
    @Param("locationId", ParseIntPipe) locationId: number,
  ): Promise<string> {
    const deleted = await this.locationService.deleteLocation(locationId);
    return deleted;
  }
}
