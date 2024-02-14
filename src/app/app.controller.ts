import { Controller, Get, Logger } from "@nestjs/common";
import { AppService } from "./app.service";
import { SuccessResponse } from "../utils/response/interfaces/success-response.interface";
import { ResponseHandler } from "../utils/response/response-handler";

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get("/")
  getHello(): SuccessResponse<string> {
    this.appService.getHello();
    this.logger.error("error logged", "stack track");

    return ResponseHandler.success<string>("data");
  }
}
