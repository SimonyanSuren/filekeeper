import { DataSource } from 'typeorm';
import { validateEnvConfigurations } from '../common/config/env.validation';
import constants from '../common/constants';
import { User } from '../models/user.entity';
import mysql2 from 'mysql2';

const { databaseConfig } = validateEnvConfigurations(process.env);

export const dataSource = new DataSource({
  type: constants.DATABASE_TYPE as 'mysql',
  host: 'localhost', //databaseConfig.MYSQL_HOST,
  port: databaseConfig.MYSQL_PORT,
  username: databaseConfig.MYSQL_USER,
  password: databaseConfig.MYSQL_PASSWORD,
  database: databaseConfig.MYSQL_DATABASE,
  entities: ['dist/models/*.js'],
  logger: 'advanced-console',
	synchronize: true,
  driver: mysql2,
  connectorPackage: "mysql2", 
});
