import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MailService from '@sendgrid/mail';
import { User } from '../entities/user.entity';
import { Email } from './entities/email.class';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    MailService.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }
  @OnEvent('user.created')
  async send(user: User) {
    const mail = new Email(
      this.configService.get('SENDGRID_FROM'),
      user.email,
      this.configService.get('SENDGRID_TEMPLATES_WELCOME'),
      { userName: user.username },
    );
    const transport = await MailService.send(mail);
    return transport;
  }
}
