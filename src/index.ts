import 'reflect-metadata';
import { app } from './app';
import { validateEnvConfigurations } from './common/config/env.validation';
import Logger from './common/logger/logger';
import { dataSource } from './database/connection';

const bootstrap = async (): Promise<void> => {
  // Validate environment configurations
  const validatedConfigs = validateEnvConfigurations(process.env);

  try {
    // Connect to database
    await dataSource.initialize();
  } catch (err) {
    Logger.error(err);
    throw err;
  }

  app.listen(validatedConfigs.HTTP_PORT, () => {
    Logger.info(`Application is listening on port ${validatedConfigs.HTTP_PORT}.`);
  });
};

// Start express server
bootstrap()
  .then((entity) => {
    return entity;
  })
  .catch((err) => {
    throw err;
    //console.log(err);
    process.exit(1);
  });

process.on('unhandledRejection', (reason) => {
  console.log(reason);
});
