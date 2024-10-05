import { diskStorage } from 'multer';
import { fileFilter } from './fileFilter.helper';
import { fileNamer } from './fileNamer.helper';

export const fileInterceptorOptions = {
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 },
  storage: diskStorage({
    destination: './static/uploads',
    filename: fileNamer,
  }),
};
