import { JwtGenerator } from '@data/protocols/JwtGenerator';
import jsonwebtoken from 'jsonwebtoken';
import { JwtGeneratorAdapter } from './JwtGeneratorAdapter';

jest.mock('jsonwebtoken', () => ({
  sign: () => 'encrypted_string',
}));
describe('Jwt generator adapter', () => {
  const sut: JwtGenerator = new JwtGeneratorAdapter();

  describe('and calls generate', () => {
    describe('and promise resolves', () => {
      let result: string;

      beforeAll(() => {
        result = sut.generate('test');
      });

      it('should return encrypted string', () => {
        expect(result).toBe('encrypted_string');
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

      it('should throws', () => {
        expect(() => sut.generate('data')).toThrow();
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

      it('should throws', () => {
        expect(() => sut.generate('data')).toThrow();
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
});
