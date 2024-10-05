import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { fileInterceptorOptions } from './helpers/fileInterceptorOptions.helper';

@ApiTags('Files - Get & Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private configService: ConfigService,
  ) {}

  @Post('user')
  @UseInterceptors(FileInterceptor('file', fileInterceptorOptions))
  @ApiResponse({ status: 201, description: 'File saved', type: String })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 403, description: 'Forbiden. Token related' })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('the file is not an image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/v1/files/user/${
      file.filename
    }`;

    return secureUrl;
  }

  @Get('user/:imageName')
  findProfilePicture(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    const path = this.filesService.getProfilePicture(imageName);

    res.sendFile(path);

    return path;
  }
}
