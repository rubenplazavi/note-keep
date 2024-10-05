import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ForgotPasswordRepository } from '../repository/typeORM/forgot-paswword.repository';
import { NewPasswordRequest } from '../dto/new-password-request.dto';
import { UsersRepository } from '../../users/persistency/typeORM/UsersRepository';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ChangePasswordService {
  constructor(
    private forgotPasswordRepository: ForgotPasswordRepository,
    private usersRepository: UsersRepository,
  ) {}

  async update(id: string, newPassword: NewPasswordRequest) {
    const changePasswordEntry =
      await this.forgotPasswordRepository.findOneByForgotId(id);

    const { user, expireDate } = changePasswordEntry;
    this.checkPasswordExpiration(expireDate);

    const newHashedPassword = User.makeHashedPassword(newPassword.password);

    const userModified = User.create(
      user.id,
      user.username,
      user.email,
      user.profilePhotoUrl,
      newHashedPassword,
    );
    userModified.createdAt = user.createdAt;
    await this.usersRepository.save(userModified);
    delete userModified.password;
    return userModified;
  }

  checkPasswordExpiration(expireDate: Date) {
    const currentDate = new Date();

    if (currentDate > expireDate) {
      throw new RequestTimeoutException('Reset password request has expired');
    }
  }
}
