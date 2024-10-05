import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDecorator } from './decorators/swagger/refresh-token.decorator';
import { Request } from 'express';
import { LoginDecorator } from './decorators/swagger/login.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @LoginDecorator()
  login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }

  @Post('refresh-token')
  @RefreshTokenDecorator()
  @UseGuards(AuthGuard('jwt'))
  refreshToken(@Req() request: Request) {
    return this.authService.getRefreshToken(request.user['id']);
  }
}
