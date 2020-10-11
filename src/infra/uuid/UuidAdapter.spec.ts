import uuid from 'uuid';
import { UuidAdapter } from './UuidAdapter';

jest.mock('uuid', () => ({
  v4: (): string => 'valid_uuid',
}));

describe('Uuid adapter', () => {
  const sut = new UuidAdapter();
  describe('when calls generate', () => {
    describe('and promise resolves', () => {
      let result: string;

      beforeAll(() => {
        result = sut.generate();
      });

      it('should return a valid uuid', () => {
        expect(result).toBe('valid_uuid');
      });
    });

    describe('and uuidv4 throws', () => {
      beforeAll(() => {
        jest.spyOn(uuid, 'v4').mockImplementationOnce(() => {
          throw new Error();
        });
      });

      it('should throw an error', () => {
        expect(() => sut.generate()).toThrow();
      });
    });
  });
});
