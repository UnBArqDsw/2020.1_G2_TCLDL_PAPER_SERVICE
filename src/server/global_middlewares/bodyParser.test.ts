/* eslint-disable import/no-extraneous-dependencies */
import app from 'server/config/app';
import supertest from 'supertest';

describe('Body Parser Middleware', () => {
  const request = supertest(app);
  beforeAll(() => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
  });

  test('Should parse body as json', async () => {
    await request
      .post('/test_body_parser')
      .send({ name: 'test' })
      .expect({ name: 'test' });
  });
});
