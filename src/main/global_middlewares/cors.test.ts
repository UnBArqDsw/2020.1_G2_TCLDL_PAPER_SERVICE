/* eslint-disable import/no-extraneous-dependencies */
import app from '@main/config/app';
import supertest from 'supertest';

describe('CORS Middleware', () => {
  const request = supertest(app);
  beforeAll(() => {
    app.get('/test_cors', (req, res) => {
      res.send();
    });
  });

  test('Should enable CORS', async () => {
    await request
      .get('/test_cors')
      .expect('access-control-allow-origin', '*');
  });
});
