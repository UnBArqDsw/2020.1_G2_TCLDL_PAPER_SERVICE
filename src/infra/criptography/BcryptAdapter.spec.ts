import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
  hash: async () => 'encrypted_string',
}));

describe('Bcrypt adapter', () => {
  const sut = new BcryptAdapter();
  describe('when calls encrypt', () => {
    describe('and promise resolves', () => {
      let result: string;

      beforeAll(async () => {
        jest.spyOn(bcrypt, 'hash');
        process.env.BCRYPT_SALT = '10';
        result = await sut.encrypt('valid_string');
      });

      it('should return a encrypted string', () => {
        expect(result).toBe('encrypted_string');
      });

      it('should call bcrypt.hash with correct params', () => {
        expect(bcrypt.hash).toHaveBeenCalledWith('valid_string', process.env.BCRYPT_SALT);
      });
    });
  });
});
