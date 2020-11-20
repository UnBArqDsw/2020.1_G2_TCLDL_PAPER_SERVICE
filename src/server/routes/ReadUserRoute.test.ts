/* eslint-disable import/no-extraneous-dependencies */
import app from '@server/config/app';
import supertest from 'supertest';
import { Connection, createConnection } from 'typeorm';
import typeormConfig from '../ormconfig';

describe('ReadUserRoute', () => {
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
  describe('when call get into users', () => {
    describe('and user is found', () => {
      test('should return 200', async () => {
        const response = await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({
          name: 'test',
          email: 'test123213@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '123456',
        });

        const { body: { token } } = await request.post(`/${process.env.SERVICE_VERSION}/login`)
          .send({
            email: 'test123213@test.com',
            password: '123456',
          });

        await request.get(`/${process.env.SERVICE_VERSION}/users/${response.body.id}`).set({
          authorization: `Bearer ${token}`,
        }).expect(200);

        await request.delete(`/${process.env.SERVICE_VERSION}/users/${response.body.id}`).set({
          authorization: `Bearer ${token}`,
        });
      });
    });

    describe('and user is not found', () => {
      test('should return 404', async () => {
        const response = await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({
          name: 'test',
          email: 'test123213@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '123456',
        });

        const { body: { token } } = await request.post(`/${process.env.SERVICE_VERSION}/login`)
          .send({
            email: 'test123213@test.com',
            password: '123456',
          });

        await request.delete(`/${process.env.SERVICE_VERSION}/users/${response.body.id}`).set({
          authorization: `Bearer ${token}`,
        });

        await request.get(`/${process.env.SERVICE_VERSION}/users/${response.body.id}`).set({
          authorization: `Bearer ${token}`,
        }).expect(404);
      });
    });
  });
});
