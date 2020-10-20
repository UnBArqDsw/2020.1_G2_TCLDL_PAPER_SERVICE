import { ReadUserAdapterDb } from '@data/interactors/ReadUserAdapterDb';
import { ReadUserRepositoryAdapter } from '@infra/db/typeorm/repositories/ReadUserRepositoryAdapter';

export class ReadUserDbFactory {
  create(): ReadUserAdapterDb {
    const createUserRepositoryAdapter = new ReadUserRepositoryAdapter();
    return new ReadUserAdapterDb(
      createUserRepositoryAdapter
    );
  }
}
