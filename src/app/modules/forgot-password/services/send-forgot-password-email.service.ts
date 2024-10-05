import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

import { ForgotPasswordEmailRequest } from '../dto/forgot-password-email-request.dto';
import { FindUserService } from '../../users/services/find-users.service';
import { v4 as uuid } from 'uuid';
import { ForgotPasswordRepository } from '../repository/typeORM/forgot-paswword.repository';
import { ForgotPasswordEntity } from '../entities/forgot.password.entity';
import { DeleteForgotPassword } from './delete-forgot-password.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class SendForgotPasswordEmail {
  constructor(
    private forgotPasswordRepository: ForgotPasswordRepository,
    private findUser: FindUserService,
    private deleteForgotPassword: DeleteForgotPassword,
    private configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(forgotPasswordEmailDto: ForgotPasswordEmailRequest) {
    const user = await this.findUser.findByEmail(forgotPasswordEmailDto.email);
    const id = uuid();

    const forgotPasswordObject = ForgotPasswordEntity.create(id, user);

    await this.deletePreviousForgotPasswordEntries(user);

    const link = this.createResetPasswordLink(id);

    this.eventEmitter.emit(
      'password.reset',
      forgotPasswordEmailDto.email,
      link,
    );

    const { id: idForgotEntry } = await this.forgotPasswordRepository.create(
      forgotPasswordObject,
    );

    return { id: idForgotEntry };
  }

  async deletePreviousForgotPasswordEntries(user: User) {
    return this.deleteForgotPassword.deleteByUserId(user);
  }

  createResetPasswordLink(idRequest: string) {
    //ToDo  --> crear variable de entorno en DEV para recogerla aquí
    const resetPasswordLinkLocal = `${this.configService.get(
      'SENDGRID_FORGOT_PASSWORD_REDIRECT',
    )}/${idRequest}`;

    return resetPasswordLinkLocal;
  }
}
