import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User as userEntity } from '../../users/entities/user.entity';
import { FindUserService } from '../../users/services/find-users.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { DynamicData } from 'src/config/types/types';

@Injectable()
export class AuthService {
  constructor(
    private findUserService: FindUserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;

    const user = await this.checkUserCredentials(email, password);

    const payload: JwtPayloadInterface = { id: user.id };

    return this.getJwtToken(payload);
  }

  async checkUserCredentials(email: string, password: string) {
    const user = await this.findUserService.findByEmail(email);

    const checkPassword = await userEntity.comparePasswords(
      password,
      user.password,
    );
    if (!checkPassword) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  private getJwtToken(payload: JwtPayloadInterface): DynamicData {
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };
  }

  getRefreshToken(id: JwtPayloadInterface): DynamicData {
    return {
      access_token: this.jwtService.sign({ id }),
      refresh_token: this.jwtService.sign({ id }, { expiresIn: '1h' }),
    };
  }
}
