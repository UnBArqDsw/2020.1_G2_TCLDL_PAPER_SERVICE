import { RemoveUserRepository } from '@data/repositories/RemoveUserRepository';
import { RemoveUser } from '@domain/interactors/RemoveUser';
import { RemoveUserAdapterDb } from './RemoveUserAdapterDb';

class RemoveUserRepositoryStub implements RemoveUserRepository {
  // eslint-disable-next-line no-empty-function
  async execute(_parameter: string): Promise<void> {}
}

describe('Remove user adapter db', () => {
  const removeUserRepositoryStub = new RemoveUserRepositoryStub();
  const sut: RemoveUser = new RemoveUserAdapterDb(removeUserRepositoryStub);

  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      beforeAll(async () => {
        jest.spyOn(removeUserRepositoryStub, 'execute');
        await sut.execute('valid_id');
      });

      test('should call removeUserRepository with correct values', () => {
        expect(removeUserRepositoryStub.execute).toHaveBeenLastCalledWith('valid_id');
      });
    });
  });
});
