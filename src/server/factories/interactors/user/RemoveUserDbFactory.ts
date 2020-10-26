import { RemoveUserAdapterDb } from '@data/interactors/user/RemoveUserAdapterDb';
import {
  RemoveUserRepositoryAdapter,
} from '@infra/db/typeorm/repositories/user/RemoveUserRepositoryAdapter';

export class RemoveUserDbFactory {
  create() {
    const removeUserRepository = new RemoveUserRepositoryAdapter();
    return new RemoveUserAdapterDb(removeUserRepository);
  }
}
