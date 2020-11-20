import { UserAdapter } from './UserAdapter';

jest.mock('./RoleAdapter', () => ({
  id: 1,
  type: 'test',
}));

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryColumn: jest.fn(),
  Column: jest.fn(),
  JoinColumn: jest.fn(),
  ManyToOne: jest.fn((callback, callback2) => {
    callback();
    callback2({ users: [] });
  }),
  OneToMany: jest.fn((callback, callback2) => {
    callback();
    callback2({ users: [] });
  }),
  OneToOne: jest.fn((callback) => {
    callback();
  }),
}));

describe('User adapter', () => {
  const sut = new UserAdapter({
    id: 'valid_id',
    name: 'valid_name',
    lastName: 'valid_lastName',
    email: 'valid_email',
    password: 'valid_password',
    createdAt: 'valid_date',
    updatedAt: 'valid_date',

  });

  describe('when user is instanciated', () => {
    it('should return a user', () => {
      expect(sut).toEqual(
        {
          id: 'valid_id',
          name: 'valid_name',
          lastName: 'valid_lastName',
          email: 'valid_email',
          password: 'valid_password',
          createdAt: 'valid_date',
          updatedAt: 'valid_date',
        },
      );
    });
  });
});
