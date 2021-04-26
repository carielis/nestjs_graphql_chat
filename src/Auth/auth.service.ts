import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/Users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(User): Promise<any> {
    const user = await this.userService.getByLogin(User.login);
    if (user && (await bcrypt.compareSync(User.password, user.password))) {
      const { password, ...result } = user;

      return result;
    }
    throw new HttpException(
      "Username or password is invalid",
      HttpStatus.METHOD_NOT_ALLOWED
    );
  }
}
