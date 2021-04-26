import { AUTHService } from "./Auth/auth.service";
import { AUTHModule } from "./Auth/auth.module";
import { UsersController } from "./Users/users.controller";
import { MessageController } from "./Message/message.controller";
import { MessageModule } from "./Message/message.module";
/* eslint-disable prettier/prettier */
import { UsersModule } from "./Users/users.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
        AUTHModule, 
        MessageModule, 
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "secret",
      database: "stage",
      autoLoadEntities: true,
      synchronize: true,
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
  ],
  controllers: [
        UsersController, 
        MessageController, AppController],
  providers: [
        AUTHService,  AppService, ],
})
export class AppModule {}
