/* eslint-disable prettier/prettier */
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ValidateUser } from "src/Dto/validate.dto";
import { InputValidateUser } from "src/Inputs/auth.input";
import { UsersService } from "src/Users/users.service";
import { AuthService } from "./auth.service";

@Resolver("auth")
export class AuthResolver {
    constructor(private authService: AuthService, private userService: UsersService) {}
 
    @Mutation()
    async login(@Args('login') login, @Args('password') password) {
        const data = {login, password}
        const user = await this.authService.validateUser(data)
        if(user) {
            return await this.userService.createToken(user)
        }
    }

   
    
}
