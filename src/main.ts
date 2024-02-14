import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { swaggerSetup } from "./configs/swagger/swagger.setup";
import { EnvService } from "./configs/env/services/env.service";
import { AppConfig } from "./configs/env/app.config";
import { EnvNamespace } from "./configs/env/enums/env-namespace.enum";
import { ValidationPipe } from "@nestjs/common";
import { createWinstonLoggerService } from "./utils/logger/winston-logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createWinstonLoggerService(),
  });
  const envService = app.get(EnvService);
  const port = envService.getEnvValue<AppConfig>(EnvNamespace.APP_CONFIG).port;

  swaggerSetup(app);
  // Utilised for validating the input field based on dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //automatically transform to type specified by validator
    }),
  );

  await app.listen(port);
}
bootstrap();
