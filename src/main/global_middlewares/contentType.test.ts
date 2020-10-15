/* eslint-disable import/no-extraneous-dependencies */
import app from '@main/config/app';
import supertest from 'supertest';

describe('Content Type Middleware', () => {
  const request = supertest(app);
  beforeAll(() => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });
  });
  test('Should return default content type as json', async () => {
    await request
      .get('/test_content_type')
      .expect('content-type', /json/);
  });
});
