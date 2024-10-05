import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getProfilePicture(imageName: string) {
    const path = join(__dirname, '../../../../static/uploads', imageName);
    //Todo Depurar esto en entorno DEV's

    if (!existsSync(path)) {
      throw new BadRequestException(
        `No profile picture found with name ${imageName}`,
      );
    }

    return path;
  }
}
