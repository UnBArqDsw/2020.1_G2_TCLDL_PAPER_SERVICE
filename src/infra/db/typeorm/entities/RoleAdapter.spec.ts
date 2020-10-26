import { RoleAdapter } from './RoleAdapter';

jest.mock('./UserAdapter', () => ({
  id: 1,
  type: 'test',
}));

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  OneToMany: jest.fn((callback, callback2) => {
    callback();
    callback2({ role: 1 });
  }),
}));

describe('Role adapter', () => {
  const sut = new RoleAdapter({
    id: 1,
    type: 'collab',
  });

  describe('when role is instanciated', () => {
    it('should return a role', () => {
      expect(sut).toEqual(
        {
          id: 1,
          type: 'collab',
        },
      );
    });
  });
});
