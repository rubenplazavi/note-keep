import { MyCustomCallback } from 'src/config/types/types';
import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: MyCustomCallback,
) => {
  if (!file) {
    return callback(new Error('File is empty'), false);
  }
  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuid()}.${fileExtension}`;

  return callback(null, fileName);
};
