import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgotPasswordEntity } from '../../entities/forgot.password.entity';
import { Repository } from 'typeorm';
import { User } from 'src/app/modules/users/entities/user.entity';
import { UsersRepository } from 'src/app/modules/users/persistency/typeORM/UsersRepository';

@Injectable()
export class ForgotPasswordRepository {
  constructor(
    @InjectRepository(ForgotPasswordEntity)
    private repository: Repository<ForgotPasswordEntity>,
    private userRepository: UsersRepository,
  ) {}

  async create(forgotPasswordEntity: ForgotPasswordEntity) {
    return this.repository.save(forgotPasswordEntity);
  }

  async delete(forgotPasswordEntity: ForgotPasswordEntity[]) {
    return this.repository.remove(forgotPasswordEntity);
  }

  async findByQuery(user: User): Promise<ForgotPasswordEntity[]> {
    const { id } = user;
    const forgotPasswordEntry = await this.repository
      .createQueryBuilder('forgotPassword')
      .where('forgotPassword.userId = :user', { user: id })
      .getMany();

    return forgotPasswordEntry;
  }

  async findOneByForgotId(id: string) {
    const forgotPasswordEntry = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!forgotPasswordEntry) {
      throw new BadRequestException('There is not a reset passwordRequest');
    }
    return forgotPasswordEntry;
  }

  async findUserById(userId: string) {
    return this.userRepository.findByID(userId);
  }
}
