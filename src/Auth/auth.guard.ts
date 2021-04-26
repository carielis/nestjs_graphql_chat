/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  
  async canActivate(context: ExecutionContext) : Promise<any> {
    const ctx = GqlExecutionContext.create(context).getContext()
    if(!ctx.headers.authorization) {
      return false
    }
    ctx.user = await this.validateToken(ctx.headers.authorization)
    return true
  }

  

  async validateToken(auth) {
    if(auth.split(' ')[0] !== "Bearer") {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    const token = auth.split(' ')[1]
    try {
      return jwt.verify(token,'Brave')
    } catch  (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }

}