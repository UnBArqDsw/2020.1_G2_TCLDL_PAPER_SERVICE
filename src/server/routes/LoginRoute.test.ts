/* eslint-disable import/no-extraneous-dependencies */
import app from '@server/config/app';
import supertest from 'supertest';
import { Connection, createConnection } from 'typeorm';
import typeormConfig from '../ormconfig';

describe('LoginRoute', () => {
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
  describe('when call delete into users', () => {
    describe('and user is found', () => {
      test('should return 204', async () => {
        await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({
          name: 'test',
          email: 'test123213@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '123456',
        }).expect(201);

        await request.post(`/${process.env.SERVICE_VERSION}/login`).send({
          email: 'test123213@test.com',
          password: '123456',
        }).expect(200);
      });
    });

    describe('and user is not found', () => {
      test('should return 401', async () => {
        await request.post(`/${process.env.SERVICE_VERSION}/login`).send({
          email: 'test1@test.com',
          password: '123456',
        }).expect(401);
      });
    });
  });
});
