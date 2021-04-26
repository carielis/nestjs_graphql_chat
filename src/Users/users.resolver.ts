/* eslint-disable prettier/prettier */
import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/Auth/auth.guard";
import { CreateUser } from "src/Dto/user.dto";
import { User } from "src/graphql";
import { InputCreateUser } from "src/Inputs/user.input";
import { UsersService } from "./users.service";



@Resolver("users")
export class UsersResolver {
  
  constructor(private UserService: UsersService) {}

  @Query(() => [CreateUser])
  users() {
    return this.UserService.getAll();
  }

  @Query()
  @UseGuards(new AuthGuard())
  getMe(@Context('user') user: User) {
    return user;
  }

  @Query(() => CreateUser)
  getUser(@Args('login') login : string) {
    return this.UserService.getByLogin(login)
  }

  @Mutation(() => CreateUser)
  createUser(@Args("login") login: string, @Args('password') password: string) {
    const data = {login,password}
    return this.UserService.createUser(data);
  }

  // @Mutation(() => CreateUser)
  // removeUser(@Args("login") login: string) {
  //   return this.UserService.removeUser(login)
  // }

}
