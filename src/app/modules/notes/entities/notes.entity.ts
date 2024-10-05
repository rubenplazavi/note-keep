import { v4 as uuid } from 'uuid';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  BeforeUpdate,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';

@Entity('notes')
export class Notes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userId: string;

  @Column('text')
  tittle: string;

  @Column('text')
  content: string;

  @ManyToMany(() => User, (user) => user.favoriteNotes)
  favoritedBy: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //Todo    debo incluir esto???  , hay que hacer pruebas @ManyToMany(() => User) user: User[];

  @BeforeInsert()
  insertDateOfUserCreation() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  insertDateOfModification() {
    this.updatedAt = new Date();
  }

  constructor(userId: string, tittle: string, content: string) {
    this.id = uuid();
    this.userId = userId;
    this.tittle = tittle;
    this.content = content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(userId: string, tittle: string, content: string) {
    return new Notes(userId, tittle, content);
  }
}
