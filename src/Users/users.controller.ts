import { Repository } from "typeorm";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Entity/user.entity";
import { UsersService } from "./users.service";

@Controller("user")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get("all")
  getAllUsers() {
    return this.userService.getAll();
  }

  //   @Get("find/:login")
  //   getOne(@Param("login") login: string) {
  //     return this.userService.getByLogin(login);
  //   }

  @Post("create")
  createUser(@Body() user: UserEntity) {
    return this.userService.createUser(user);
  }
}
