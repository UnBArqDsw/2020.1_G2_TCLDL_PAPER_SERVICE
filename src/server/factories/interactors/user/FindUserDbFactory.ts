import FindUserAdapterDb from '@data/interactors/user/FindUserAdapterDb';
import {
  FindUserRepositoryAdapter,
} from '@infra/db/typeorm/repositories/user/FindUserRepositoryAdapter';

export class FindUserDbFactory {
  create(): FindUserAdapterDb {
    const findUserRepository = new FindUserRepositoryAdapter();
    return new FindUserAdapterDb(findUserRepository);
  }
}
