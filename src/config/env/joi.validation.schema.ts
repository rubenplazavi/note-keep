import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.required().default('note-keep'),
  DB_HOST: Joi.required().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.required().default('postgres'),
  MAX_FILE_SIZE: Joi.required().default(1048576),
  UPLOAD_LOCATION: Joi.required().default('/src/uploads'),
});
