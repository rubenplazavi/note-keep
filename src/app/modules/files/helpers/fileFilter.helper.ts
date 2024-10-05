import { MyCustomCallback } from 'src/config/types/types';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: MyCustomCallback,
) => {
  if (!file) {
    return callback(new Error('File is empty'), false);
  }
  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  return callback(null, false);
};
