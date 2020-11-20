import { User } from '@domain/entities/User';
import typeorm from 'typeorm';
import { UpdateUserRepositoryAdapter } from './UpdateUserRepositoryAdapter';

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn().mockImplementation(() => ({
      id: 'valid_id',
      name: 'edited_name',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
      createdAt: 'valid_createdAt',
      updatedAt: 'valid_updatedAt',
    })),
    save: jest.fn(),
  }),
}));

jest.mock('../../entities/UserAdapter', () => ({
  UserAdapter: jest.fn().mockImplementation((data) => data),
}));

describe('Update User Repository', () => {
  describe('when calls execute', () => {
    const sut = new UpdateUserRepositoryAdapter();

    describe('and promise resolves', () => {
      describe('and user is found', () => {
        let result: User | undefined;
        beforeAll(async () => {
          result = await sut.execute({ id: 'valid_id', name: 'edited_name' });
        });

        it('should return user updated', () => {
          expect(result).toEqual({
            id: 'valid_id',
            name: 'edited_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            createdAt: 'valid_createdAt',
            updatedAt: 'valid_updatedAt',
          });
        });
      });

      describe('and user is not found', () => {
        let result: User | undefined;
        beforeAll(async () => {
          jest.spyOn(typeorm.getRepository('user'), 'findOne')
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce(undefined);

          result = await sut.execute({ id: 'valid_id', name: 'edited_name' });
        });

        it('should return user updated', () => {
          expect(result).toEqual(undefined);
        });
      });
    });

    describe('and findOne throws', () => {
      let result: Promise<User | undefined>;
      beforeAll(async () => {
        jest.spyOn(typeorm.getRepository('user'), 'findOne').mockRejectedValueOnce(new Error());
        result = sut.execute({ id: 'valid_id', name: 'edited_name' });
      });

      it('should return user updated', async () => {
        await expect(result).rejects.toThrow();
      });
    });

    describe('and save throws', () => {
      let result: Promise<User | undefined>;
      beforeAll(async () => {
        jest.spyOn(typeorm.getRepository('user'), 'save').mockRejectedValue(new Error());
        result = sut.execute({ id: 'valid_id', name: 'edited_name' });
      });

      it('should return user updated', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});
