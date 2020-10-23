/* eslint-disable import/no-extraneous-dependencies */
import app from '@server/config/app';
import { typeormConfig } from '@server/ormconfig';
import supertest from 'supertest';
import { Connection, createConnection } from 'typeorm';

describe('RemoveUserRoute', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection(typeormConfig);
    await connection.synchronize();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  const request = supertest(app);
  describe('when call delete into users', () => {
    describe('and user is found', () => {
      test('should return 204', async () => {
        const response = await request.post(`/${process.env.SERVICE_VERSION}/signup`).send({
          name: 'test',
          email: 'test@test.com',
          lastName: 'test',
          password: '123456',
          passwordConfirmation: '123456',
        }).expect(201);

        await request.delete(`/${process.env.SERVICE_VERSION}/users/${response.body.id}`)
          .expect(204);
      });
    });

    describe('and user is not found', () => {
      test('should return 404', async () => {
        await request.delete(`/${process.env.SERVICE_VERSION}/users/valid_id`)
          .expect(404);
      });
    });
  });
});
