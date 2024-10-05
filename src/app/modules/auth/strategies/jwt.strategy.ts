import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { FindUserService } from '../../users/services/find-users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private findUserService: FindUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadInterface) {
    const user = await this.findUserService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
