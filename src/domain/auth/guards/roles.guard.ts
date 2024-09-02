import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (roles, userRoles) => {
  return roles.some((role) => role === userRoles);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    const { path, method } = req;

    const excludedRoutes = [{ path: '/products/approved', method: 'GET' }];

    const isExcluded = excludedRoutes.some(
      (route) => route.path === path && route.method === method,
    );

    if (isExcluded) {
      return true;
    }
    const user = req.user;
    return matchRoles(roles, user.role);
  }
}
