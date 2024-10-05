import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Notes } from '../../notes/entities/notes.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  username: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  profilePhotoUrl: string;

  @Column('text')
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToMany(() => Notes, (notes) => notes.favoritedBy)
  @JoinTable({ name: 'favorites' })
  favoriteNotes: Notes[];

  @BeforeInsert()
  insertDateOfUserCreation() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static comparePasswords(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }

  static makeHashedPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  constructor(
    id: string,
    username: string,
    email: string,
    profilePhotoUrl: string,
    password: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.profilePhotoUrl = profilePhotoUrl;
    this.password = password;
  }

  static create(
    id: string,
    username: string,
    email: string,
    profilePhotoUrl: string,
    password: string,
  ) {
    return new User(id, username, email, profilePhotoUrl, password);
  }
}
