import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgot-password.controller';
import { SendForgotPasswordEmail } from './services/send-forgot-password-email.service';
import { ForgotPasswordRepository } from './repository/typeORM/forgot-paswword.repository';
import { FindUserService } from '../users/services/find-users.service';
import { ForgotPasswordEntity } from './entities/forgot.password.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { DeleteForgotPassword } from './services/delete-forgot-password.service';
import { ChangePasswordService } from './services/change-password.service';
import { ConfigModule } from '@nestjs/config';
import { ForgotPasswordMailer } from './mailers/sendgrid-forgot-password.mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForgotPasswordEntity]),
    UsersModule,
    ConfigModule,
  ],
  controllers: [ForgotPasswordController],
  providers: [
    SendForgotPasswordEmail,
    ForgotPasswordRepository,
    FindUserService,
    DeleteForgotPassword,
    ChangePasswordService,
    ForgotPasswordMailer,
  ],
})
export class ForgotPasswordModule {}
