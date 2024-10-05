import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { SeedModule } from './modules/seed/seed.module';
import { EnvConfiguration } from 'src/config/env/app.config';
import { JoiValidationSchema } from 'src/config/env/joi.validation.schema';
import { AuthModule } from './modules/auth/auth.module';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { NotesModule } from './modules/notes/notes.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    //Todo: intentar que cargue las opciones, aún no lo carga en otros módulos --> TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
    FilesModule,
    SeedModule,
    AuthModule,
    ForgotPasswordModule,
    NotesModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
