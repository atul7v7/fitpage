import { INestApplication } from "@nestjs/common";
import {
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { swaggerConfig } from "./swagger.config";

const swaggerDocumentOption: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};

export function createSwaggerDocument(app: INestApplication): OpenAPIObject {
  return SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerDocumentOption,
  );
}
