/* eslint-disable import/no-extraneous-dependencies */
import app from '@server/config/app';
import supertest from 'supertest';
import { Connection, createConnection } from 'typeorm';
import typeormConfig from '../ormconfig';

describe('SignUpRoute', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection(typeormConfig);
    await connection.dropDatabase();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.close();
  });

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
          email: 'test2@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '12345',
        }).expect(400);
      });
    });

    describe('and body fields is missing', () => {
      test('should return 400', async () => {
        await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({}).expect(400);
      });
    });

    describe('and users already exists', () => {
      test('should return 422', async () => {
        await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({
          name: 'test',
          email: 'test@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '123456',
        }).expect(422);
      });
    });
  });
});
