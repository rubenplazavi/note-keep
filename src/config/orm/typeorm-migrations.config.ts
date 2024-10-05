import { User } from 'src/app/modules/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['src/**/!(*example*).entity.ts'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
  migrations: ['artifacts/orm/migrations/*.ts'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
