import {
  DatabaseConfig,
  JwtConfig,
  validateEnvConfigurations,
} from '../common/config/env.validation';

type AppConfigType = {
  databaseConfig: DatabaseConfig;
  jwtConfig: JwtConfig;
  NODE_ENV: string;
  LISTEN_INTERFACE: string;
  HTTP_PORT: number;
};
export class ConfigService {
  static configs: AppConfigType;

  static validate(): void {
    ConfigService.configs = validateEnvConfigurations(process.env);
  }

  static getConfigs(): AppConfigType {
    if (!ConfigService.configs) {
      ConfigService.validate();
    }
    return ConfigService.configs;
  }
}
