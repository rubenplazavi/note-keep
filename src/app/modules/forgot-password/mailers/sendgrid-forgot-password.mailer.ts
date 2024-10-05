import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MailService from '@sendgrid/mail';
import { Email } from '../../users/mailers/entities/email.class';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ForgotPasswordMailer {
  constructor(private readonly configService: ConfigService) {
    MailService.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  @OnEvent('password.reset')
  async send(email: string, url: string) {
    const mail = new Email(
      this.configService.get('SENDGRID_FROM'),
      email,
      this.configService.get('SENDGRID_TEMPLATES_FORGOT_PASSWORD'),
      { redirectUrl: url },
    );
    const transport = await MailService.send(mail);
    return transport;
  }
}
