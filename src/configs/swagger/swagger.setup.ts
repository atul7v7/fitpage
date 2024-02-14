import { INestApplication } from "@nestjs/common";
import { SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { createSwaggerDocument } from "./swagger.document";

const swaggerCustomerOption: SwaggerCustomOptions = {
  customSiteTitle: "Fitpage Api Docs",
  customfavIcon:
    "https://fitpage.in/wp-content/uploads/2021/02/Fitpage-Logo_Home-Page-6.png",
};

export function swaggerSetup(app: INestApplication) {
  const swaggerDocument = createSwaggerDocument(app);
  SwaggerModule.setup("swagger", app, swaggerDocument, swaggerCustomerOption);
}
