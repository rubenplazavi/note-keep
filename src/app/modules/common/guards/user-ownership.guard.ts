import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();

    const { id: ownerId } = request.params;
    const { id: authUserId } = request.user;

    if (ownerId !== authUserId) {
      throw new UnauthorizedException('Autentification failed!');
    }

    return true;
  }
}
