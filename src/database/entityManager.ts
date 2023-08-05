import { dataSource } from './connection';

export const entityManager = dataSource.createEntityManager();
