import { FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { User } from '@domain/entities/User';
import * as typeorm from 'typeorm';
import { FindUserRepositoryAdapter } from './FindUserRepositoryAdapter';

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    findOne: jest.fn().mockImplementation(() => ({
      id: 'valid_id',
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
      createdAt: 'valid_createdAt',
      updatedAt: 'valid_updatedAt',
    })),
  }),
}));

jest.mock('../../entities/UserAdapter', () => ({
  UserAdapter: jest.fn().mockImplementation((data) => data),
}));

describe('Find user repository adapter', () => {
  const sut: FindUserRepository = new FindUserRepositoryAdapter();
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let result: User | undefined;
      beforeAll(async () => {
        result = await sut.execute({ id: 'test' });
      });

      it('should return user', () => {
        expect(result).toEqual({
          id: 'valid_id',
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
          createdAt: 'valid_createdAt',
          updatedAt: 'valid_updatedAt',
        });
      });

      it('should call findOne with correct params', () => {
        expect(typeorm.getRepository('test').findOne).toHaveBeenCalledWith({
          where: { id: 'test' },
        });
      });
    });

    describe('and getRepository throws', () => {
      let result: Promise<User | undefined>;
      beforeAll(() => {
        jest.spyOn(typeorm, 'getRepository').mockImplementationOnce(() => {
          throw new Error();
        });
        result = sut.execute({ email: 'test' });
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });

    describe('and findOne throws', () => {
      let result: Promise<User | undefined>;
      beforeAll(() => {
        jest.spyOn(typeorm.getRepository('test'), 'findOne')
          .mockRejectedValueOnce(new Error());
        result = sut.execute({ id: 'test' });
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });
  });
});
