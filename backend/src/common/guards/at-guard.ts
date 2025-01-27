import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = {
        id: decoded.userId,
        role: decoded.role,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authorization = request.headers['authorization'];
    if (!authorization) {
      return null;
    }
    const [, token] = authorization.split(' ');
    return token || null;
  }
}
