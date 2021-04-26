/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(data) {
      const user = await this.authService.validateUser(data)
      if(!user) {
          throw new HttpException('Unauthorized', 400)
      } 
      return user
  }
}
