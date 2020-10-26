import { CreateUserAdapterDb } from '@data/interactors/user/CreateUserAdapterDb';
import { EncrypterAdapter } from '@infra/criptography/EncrypterAdapter';
import { DateGeneratorAdapter } from '@infra/date_generator/DateGeneratorAdapter';
import { FindRoleRepositoryByTypeAdapter } from '@infra/db/typeorm/repositories/role/FindRoleRepositoryByTypeAdapter';
import { FindRoleRepositoryContextAdapter } from '@infra/db/typeorm/repositories/role/FindRoleRepositoryContextAdapter';
import { CreateUserRepositoryAdapter } from '@infra/db/typeorm/repositories/user/CreateUserRepositoryAdapter';
import { UuidAdapter } from '@infra/uuid/UuidAdapter';

export class CreateUserDbFactory {
  create(): CreateUserAdapterDb {
    const createUserRepositoryAdapter = new CreateUserRepositoryAdapter();
    const findRoleRepositoryAdapter = new FindRoleRepositoryContextAdapter(
      new FindRoleRepositoryByTypeAdapter(),
    );
    const encrypterAdapter = new EncrypterAdapter();
    const uuidAdapter = new UuidAdapter();
    const dateGeneratorAdapter = new DateGeneratorAdapter();

    return new CreateUserAdapterDb(
      createUserRepositoryAdapter, encrypterAdapter, uuidAdapter, dateGeneratorAdapter,
      findRoleRepositoryAdapter,
    );
  }
}
