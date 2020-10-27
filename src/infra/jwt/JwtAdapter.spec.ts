import { Jwt } from '@data/protocols/Jwt';
import jsonwebtoken from 'jsonwebtoken';
import { JwtAdapter } from './JwtAdapter';

jest.mock('jsonwebtoken', () => ({
  sign: () => 'encrypted_string',
  verify: () => 'decrypted_data',
}));

describe('Jwt generator adapter', () => {
  const sut: Jwt = new JwtAdapter();

  describe('and calls generate', () => {
    describe('and everithing is ok', () => {
      let result: string;

      beforeAll(() => {
        result = sut.generate('test');
      });

      it('should return encrypted string', () => {
        expect(result).toBe('encrypted_string');
      });
    });

    describe('and jwt sign throws', () => {
      beforeAll(() => {
        jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce(() => {
          throw new Error();
        });
      });

      it('should throws', () => {
        expect(() => sut.generate('data')).toThrow();
      });
    });
  });

  describe('and calls verify', () => {
    describe('and everithing is ok', () => {
      let result: string;

      beforeAll(() => {
        result = sut.verify('test');
      });

      it('should return decrypted string', () => {
        expect(result).toBe('decrypted_data');
      });
    });

    describe('and is invalid token', () => {
      beforeAll(() => {
        jest.spyOn(jsonwebtoken, 'verify').mockImplementationOnce(() => {
          throw new Error();
        });
      });

      it('should throws', () => {
        expect(() => sut.verify('invalid_token')).toThrowError('Invalid token.');
      });
    });
  });

  describe('and JWT secret is not defined', () => {
    const jwtSecret = process.env.JWT_SECRET;
    beforeAll(() => {
      delete process.env.JWT_SECRET;
    });

    afterAll(() => {
      process.env.JWT_SECRET = jwtSecret;
    });

    it('should generate throws', () => {
      expect(() => sut.generate('data')).toThrow();
    });

    it('should verify throws', () => {
      expect(() => sut.verify('data')).toThrow();
    });
  });

  describe('and JWT exp time is not defined', () => {
    const jwtExpTime = process.env.JWT_EXP_TIME;
    beforeAll(() => {
      delete process.env.JWT_EXP_TIME;
    });

    afterAll(() => {
      process.env.JWT_EXP_TIME = jwtExpTime;
    });

    it('should generate throws', () => {
      expect(() => sut.generate('data')).toThrow();
    });

    it('should verify throws', () => {
      expect(() => sut.verify('data')).toThrow();
    });
  });
});
