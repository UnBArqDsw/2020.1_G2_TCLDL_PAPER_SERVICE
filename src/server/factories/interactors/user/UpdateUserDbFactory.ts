import { UpdateUserAdapterDb } from '@data/interactors/user/UpdateUserAdapterDb';
import { EncrypterAdapter } from '@infra/criptography/EncrypterAdapter';
import { DateGeneratorAdapter } from '@infra/date_generator/DateGeneratorAdapter';
import { UpdateUserRepositoryAdapter }
  from '@infra/db/typeorm/repositories/user/UpdateUserRepositoryAdapter';

export class UpdateUserDbFactory {
  create(): UpdateUserAdapterDb {
    const updateUserRepositoryAdapter = new UpdateUserRepositoryAdapter();
    const encrypter = new EncrypterAdapter();
    const dateGenerator = new DateGeneratorAdapter();
    return new UpdateUserAdapterDb(
      updateUserRepositoryAdapter,
      encrypter,
      dateGenerator,
    );
  }
}
