import FindUserAdapterDb from '@data/interactors/FIndUserAdapterDb';
import { FindUserRepositoryAdapter } from '@infra/db/typeorm/repositories/FindUserRepositoryAdapter';

export class FindUserDbFactory {
  create(): FindUserAdapterDb {
    const findUserRepository = new FindUserRepositoryAdapter();
    return new FindUserAdapterDb(findUserRepository);
  }
}
