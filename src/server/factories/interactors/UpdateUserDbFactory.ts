import { UpdateUserAdapterDb } from '@data/interactors/UpdateUserAdapterDb';
import { UpdateUserRepositoryAdapter } from '@infra/db/typeorm/repositories/UpdateUserRepositoryAdapter';

export class UpdateUserDbFactory {
  create(): UpdateUserAdapterDb {
    const updateUserRepositoryAdapter = new UpdateUserRepositoryAdapter();
    return new UpdateUserAdapterDb(
      updateUserRepositoryAdapter
    );
  }
}
