import { CreateUserAdapterDb } from '@data/interactors/CreateUserAdapterDb';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter';
import { DateGeneratorAdapter } from '@infra/date_generator/DateGeneratorAdapter';
import { CreateUserRepositoryAdapter } from '@infra/db/typeorm/repositories/CreteUserRepositoryAdapter';
import { UuidAdapter } from '@infra/uuid/UuidAdapter';

export class CreateUserDbFactory {
  create(): CreateUserAdapterDb {
    const createUserRepositoryAdapter = new CreateUserRepositoryAdapter();
    const bcryptAdapter = new BcryptAdapter();
    const uuidAdapter = new UuidAdapter();
    const dateGeneratorAdapter = new DateGeneratorAdapter();
    return new CreateUserAdapterDb(
      createUserRepositoryAdapter, bcryptAdapter, uuidAdapter, dateGeneratorAdapter,
    );
  }
}
