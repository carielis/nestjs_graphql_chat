import { MessageService } from "./Message/message.service";
import { MessageModule } from "./Message/message.module";
import { AuthModule } from "./Auth/auth.module";
/* eslint-disable prettier/prettier */
import { UsersModule } from "./Users/users.module";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppResolver } from "./app.resolver";

import { PassportModule } from "@nestjs/passport";
import { join } from "node:path";
import { PubSub } from "graphql-subscriptions";

@Module({
  imports: [
        MessageModule, 
        AuthModule, 
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
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({req,res} ) => ({req,res}) ,
      definitions: {path: join(process.cwd(), 'src/graphql.ts')},
      installSubscriptionHandlers: true,
     
      subscriptions: {
        keepAlive: 5000,
      }
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [ AppService, AppResolver, {provide: "PUB_SUB", useValue: new PubSub()}],
})
export class AppModule {}
