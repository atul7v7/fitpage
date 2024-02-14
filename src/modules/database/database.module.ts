import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";
import { getMysqlDataSource } from "./data-source";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "mysql",
      port: 3306,
      name: getMysqlDataSource(), // 'mysql'
      username: "user",
      password: "root",
      database: "fitpage",
      entities: [path.join(__dirname, "../../**/*.entity{.ts,.js}")],
      synchronize: true, // get rid of it soon as task optimisation
    }),
  ],
  exports: [],
  providers: [],
})
export class DatabaseModule {}
