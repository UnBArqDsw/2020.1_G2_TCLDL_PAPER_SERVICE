import * as typeorm from 'typeorm';
import { RemoveUserRepositoryAdapter } from './RemoveUserRepositoryAdapter';

jest.mock('typeorm', () => ({
  getRepository: jest.fn().mockReturnValue({
    delete: jest.fn().mockImplementation((data) => data),
  }),
}));

jest.mock('../../entities/UserAdapter', () => ({
  UserAdapter: jest.fn().mockImplementation((data) => data),
}));

describe('Remove user repository adapter', () => {
  const sut = new RemoveUserRepositoryAdapter();
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      beforeAll(async () => {
        await sut.execute('valid_id');
      });

      test('should call typeorm.delete with correct params', () => {
        expect(typeorm.getRepository('test').delete).toHaveBeenLastCalledWith({ id: 'valid_id' });
      });
    });

    describe('and getRepository throws', () => {
      let result: Promise<void>;
      beforeAll(() => {
        jest.spyOn(typeorm, 'getRepository').mockImplementationOnce(() => {
          throw new Error();
        });
        result = sut.execute('valid_id');
      });

      test('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });

    describe('and delete throws', () => {
      let result: Promise<void>;
      beforeAll(() => {
        jest.spyOn(typeorm, 'getRepository').mockImplementationOnce(() => {
          throw new Error();
        });
        result = sut.execute('valid_id');
      });

      test('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });
  });
});
