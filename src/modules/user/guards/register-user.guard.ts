import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../models/enums/user.enum';

@Injectable()
export class RegisteUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user?.role === UserRoles.ADMIN 
      || request?.body?.role !== UserRoles.ADMIN) {
      return true;
    }

    throw new HttpException('Invalid role or insufficient permissions', HttpStatus.FORBIDDEN);
  }
}