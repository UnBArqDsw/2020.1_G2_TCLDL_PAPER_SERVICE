import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { VerifyIfUserIsSameOfDecodedToken } from './VerifyIfUserIsSameOfDecodedToken';

describe('Verify if user is same of decoded token', () => {
  const sut = new VerifyIfUserIsSameOfDecodedToken();
  describe('when calls handle', () => {
    describe('and promise resolves', () => {
      describe('and id is the same', () => {
        let request: HttpRequest;
        let response: HttpResponse;

        beforeAll(async () => {
          request = {
            params: {
              userId: 'valid_id',
            },
            headers: {
              decodedToken: {
                id: 'valid_id',
              },
            },
          };
          response = await sut.handle(request);
        });

        it('should return 200', () => {
          expect(response.statusCode).toBe(200);
        });
      });

      describe('and id is not the same', () => {
        let request: HttpRequest;
        let response: HttpResponse;

        beforeAll(async () => {
          request = {
            params: {
              userId: 'invalid_id',
            },
            headers: {
              decodedToken: {
                id: 'valid_id',
              },
            },
          };
          response = await sut.handle(request);
        });

        it('should return 401', () => {
          expect(response.statusCode).toBe(401);
        });

        it('should return unauthorized in body', () => {
          expect(response.body).toBe('Unauthorized.');
        });
      });

      describe('and header is not provided', () => {
        let request: HttpRequest;
        let response: HttpResponse;

        beforeAll(async () => {
          request = {
            params: {
              userId: 'invalid_id',
            },
          };
          response = await sut.handle(request);
        });

        it('should return 401', () => {
          expect(response.statusCode).toBe(401);
        });

        it('should return unauthorized in body', () => {
          expect(response.body).toBe('Unauthorized.');
        });
      });
    });
  });
});
