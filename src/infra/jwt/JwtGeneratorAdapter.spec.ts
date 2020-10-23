import { JwtGenerator } from '@data/protocols/JwtGenerator';
import { JwtGeneratorAdapter } from './JwtGeneratorAdapter';

jest.mock('jsonwebtoken', () => ({
  sign: () => 'encrypted_string',
}));
describe('Jwt generator adapter', () => {
  const sut: JwtGenerator = new JwtGeneratorAdapter();

  describe('and calls generate', () => {
    describe('and promise resolves', () => {
      let result: string;

      beforeAll(async () => {
        result = await sut.generate('test');
      });

      it('should return encrypted string', () => {
        expect(result).toBe('encrypted_string');
      });
    });
  });
});
