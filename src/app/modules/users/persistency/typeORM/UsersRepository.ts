import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateUserResponseDto } from '../../dto/update-user-response.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) throw new BadRequestException(`user not found`);

    return user;
  }
  async findByID(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new BadRequestException(`user not found`);

    return user;
  }

  async find() {
    return this.usersRepository.find();
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async save(user: User): Promise<User> {
    return this.create(user);
  }

  async update(user: UpdateUserResponseDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  async deleteAll() {
    return this.usersRepository.delete({});
  }

  async deleteById(id: string) {
    return this.usersRepository.delete(id);
  }

  async isNoteFavoriteForUser(
    usersId: string,
    notesId: string,
  ): Promise<boolean> {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.favoriteNotes', 'notes', 'notes.id = :notesId', {
        notesId,
      })
      .where('user.id = :usersId', { usersId })
      .getOne();

    return !!result;
  }

  async findUserWithRelationFavoritesById(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['favoriteNotes'],
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException('wtf:', error);
    }
  }

  async findFavoritesById(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['favoriteNotes'],
      });

      return user.favoriteNotes;
    } catch (error) {
      throw new InternalServerErrorException('wtf:', error);
    }
  }
}
