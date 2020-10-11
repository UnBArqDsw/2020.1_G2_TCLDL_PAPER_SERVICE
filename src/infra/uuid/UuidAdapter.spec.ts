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
  });
});
