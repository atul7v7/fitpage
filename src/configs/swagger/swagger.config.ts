import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Fitpage Demo App developed by Atul")
  .setDescription("Added functionality as per the docs")
  .setVersion("1.0.0")
  
  .setContact(
    "Atul singh",
    'www.linkedin.com/in/atul7v7',
    "atul7v7@gmail.com",
  )
  .addTag("Atul")
  .build();
