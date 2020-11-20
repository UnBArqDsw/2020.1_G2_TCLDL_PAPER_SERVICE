import { CreatePaperAdapterDb } from '@data/interactors/paper/CreatePaperAdapterDb';
import { DateGeneratorAdapter } from '@infra/date_generator/DateGeneratorAdapter';
import { CreatePaperRepositoryAdapter } from '@infra/db/typeorm/repositories/paper/CreatePaperRepositoryAdapter';
import { FindUserRepositoryAdapter } from '@infra/db/typeorm/repositories/user/FindUserRepositoryAdapter';
import { UuidAdapter } from '@infra/uuid/UuidAdapter';

export class CreatePaperDbFactory {
  create() {
    const createPaperRepository = new CreatePaperRepositoryAdapter();
    const uuidGenerator = new UuidAdapter();
    const dateGenerator = new DateGeneratorAdapter();
    const findUserRepository = new FindUserRepositoryAdapter();

    return new CreatePaperAdapterDb(
      createPaperRepository,
      uuidGenerator,
      dateGenerator,
      findUserRepository,
    );
  }
}
