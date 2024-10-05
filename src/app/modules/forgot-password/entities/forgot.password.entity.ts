import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('forgot_password')
export class ForgotPasswordEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'timestamptz',
    default: () => "NOW() + (10 * interval '1 minute')",
  })
  expireDate: Date;

  constructor(id: string, user: User) {
    this.id = id;
    this.user = user;
  }

  static create(id: string, user: User) {
    return new ForgotPasswordEntity(id, user);
  }
}
