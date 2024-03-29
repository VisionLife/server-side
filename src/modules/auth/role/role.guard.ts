import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/modules/user/models/enums/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const requiredRole = this.reflector.get<UserRoles[]>('allowedRoles', context.getHandler());

    // if (!requiredRole) {
    //   return true;
    // }

    if (request?.user && requiredRole.includes(request.user.role)) {
      return true;
    }

    throw new HttpException('Invalid role or insufficient permissions', HttpStatus.FORBIDDEN);
  }
}
