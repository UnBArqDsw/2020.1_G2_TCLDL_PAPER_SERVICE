import { RemoveUserAdapterDb } from '@data/interactors/RemoveUserAdapterDb';
import { RemoveUserRepositoryAdapter } from '@infra/db/typeorm/repositories/RemoveUserRepositoryAdapter';

export class RemoveUserDbFactory {
  create() {
    const removeUserRepository = new RemoveUserRepositoryAdapter();
    return new RemoveUserAdapterDb(removeUserRepository);
  }
}
