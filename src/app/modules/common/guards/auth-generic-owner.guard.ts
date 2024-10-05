import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from './user-ownership.guard';

export function AuthGenericOwnerGuard(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard('jwt'), OwnershipGuard));
}
