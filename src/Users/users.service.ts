/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs"
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>
  ) {}

  getAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }
  
  async getByLogin(loged) {
    const user =  await this.repository.findOne({login: loged})
    if(user) {
      return user
    }
   
  }

  async removeUser(login) {
    const user = await this.getByLogin(login)
    if(user) {
      await this.repository.remove(user)
      return user
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(user) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(user.password, salt);
    const checkOnLogin = await this.getByLogin(user.login)
    if(!checkOnLogin) {
      const createUser = this.repository.create({login: user.login, password: hash });
      await  this.repository.save(createUser);
      return  createUser;
    }
     throw new HttpException('Username reserved', HttpStatus.BAD_REQUEST);
  }

  createToken({login, userId}: UserEntity) {
    return jwt.sign({login, userId}, "Brave")
  }
}
