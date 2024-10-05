import { Injectable } from '@nestjs/common';
import { ForgotPasswordRepository } from '../repository/typeORM/forgot-paswword.repository';
import { User } from '../../users/entities/user.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class DeleteForgotPassword {
  constructor(private forgotPasswordRepository: ForgotPasswordRepository) {}

  async deleteByUserId(user: User) {
    const forgotPasswordEntry = await this.forgotPasswordRepository.findByQuery(
      user,
    );

    if (forgotPasswordEntry)
      return await this.forgotPasswordRepository.delete(forgotPasswordEntry);
    return false;
  }

  @OnEvent('user.deleted')
  async DeleteForgotPasswordOnUserDeleted(userId: string) {
    const user = await this.forgotPasswordRepository.findUserById(userId);
    this.deleteByUserId(user);
  }
}
