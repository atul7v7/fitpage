import { Injectable } from "@nestjs/common";
import { EnvService } from "../configs/env/services/env.service";
import { AppConfig } from "../configs/env/app.config";
import { EnvNamespace } from "../configs/env/enums/env-namespace.enum";

@Injectable()
export class AppService {
  constructor(private envService: EnvService) {}
  async getHello(): Promise<string> {
    const appConfig = this.envService.getEnvValue<AppConfig>(
      EnvNamespace.APP_CONFIG,
    );
    return `Translense Server up and running at port ${appConfig.port}`;
  }
}
