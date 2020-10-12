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

    describe('and BCRYPT_SALT is not defined', () => {
      beforeAll(async () => {
        jest.spyOn(bcrypt, 'hash');
        delete process.env.BCRYPT_SALT;
        await sut.encrypt('valid_string');
      });

      it('should call bcrypt with salt 12', () => {
        expect(bcrypt.hash).toHaveBeenCalledWith('valid_string', 12);
      });
    });

    describe('and bcrypt.hash throws', () => {
      let result: Promise<string>;
      beforeAll(() => {
        jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error());
        result = sut.encrypt('valid_string');
      });

      it('should throw an error', async () => {
        await expect(result).rejects.toThrow();
      });
    });
  });
});