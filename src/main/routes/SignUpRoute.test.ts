/* eslint-disable import/no-extraneous-dependencies */
import app from '@main/config/app';
import supertest from 'supertest';

describe('SignUpRoute', () => {
  const request = supertest(app);
  describe('when post into users', () => {
    describe('and body is valid', () => {
      test('should return 201 with valid id', async () => {
        await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({
          name: 'test',
          email: 'test@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '123456',
        }).expect(201);
      });
    });

    describe('and password and passwordConfirmation are not equal', () => {
      test('should return 400', async () => {
        await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({
          name: 'test',
          email: 'test@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '123456',
        }).expect(400);
      });
    });

    describe('and body fields is missing', () => {
      test('should return 400', async () => {
        await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({}).expect(400);
      });
    });
  });
});
