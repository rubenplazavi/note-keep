import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  //ToDo  poner campos que se quieran actualizar, el email parece que no se va a actualizar, solo password y nombre
}
