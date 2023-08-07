import { DataSource } from 'typeorm';
import { validateEnvConfigurations } from '../common/config/env.validation';
import constants from '../common/constants';

const { databaseConfig } = validateEnvConfigurations(process.env);

export const dataSource = new DataSource({
  type: constants.DATABASE_TYPE as 'mysql',
  host: '127.0.0.1', //databaseConfig.MYSQL_HOST,
  port: databaseConfig.MYSQL_PORT,
  username: databaseConfig.MYSQL_USER,
  password: databaseConfig.MYSQL_PASSWORD,
  database: databaseConfig.MYSQL_DATABASE,
  entities: ['dist/models/*.js'],
  logger: 'debug',
  synchronize: true,
  //driver: mysql2,
  //connectorPackage: 'mysql2',
});
