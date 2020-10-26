import { Jwt } from '@data/protocols/Jwt';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { AuthMiddleware } from './AuthMiddleware';

class JwtStub implements Jwt {
  generate(_data: string): string {
    return 'valid_jwt';
  }

  verify(_data: string): any {
    return {
      id: 'valid_id',
      email: 'valid_email',
    };
  }
}

describe('Auth middleware', () => {
  const jwtStub = new JwtStub();
  const sut = new AuthMiddleware(jwtStub);

  describe('when calls handle', () => {
    describe('and promise resolves', () => {
      let response: HttpResponse;
      let request: HttpRequest;

      beforeAll(async () => {
        request = {
          headers: {
            Authorization: 'Baerer token',
          },
          locals: {},
        };
        response = await sut.handle(request);
      });

      it('should return 200', () => {
        expect(response.statusCode).toBe(200);
      });

      it('should have a decoded token in locals', () => {
        expect(request.locals?.decodedToken).toEqual({
          id: 'valid_id',
          email: 'valid_email',
        });
      });
    });

    describe('and authorization is not provided', () => {
      let response: HttpResponse;
      let request: HttpRequest;

      beforeAll(async () => {
        request = {
          locals: {},
        };
        response = await sut.handle(request);
      });

      it('should return 401', () => {
        expect(response.statusCode).toBe(401);
      });

      it('should return message token was not provided in body', () => {
        expect(response.body).toBe('Token was not provided.');
      });
    });

    describe('and token is not provided', () => {
      let response: HttpResponse;
      let request: HttpRequest;

      beforeAll(async () => {
        request = {
          headers: {
            Authorization: 'Baerer ',
          },
          locals: {},
        };
        response = await sut.handle(request);
      });

      it('should return 401', () => {
        expect(response.statusCode).toBe(401);
      });

      it('should return message token was not provided in body', () => {
        expect(response.body).toBe('Token was not provided.');
      });
    });

    describe('and token is invalid', () => {
      let response: HttpResponse;
      let request: HttpRequest;

      beforeAll(async () => {
        request = {
          headers: {
            Authorization: 'Baerer invalid_token',
          },
          locals: {},
        };
        jest.spyOn(jwtStub, 'verify').mockImplementationOnce(() => {
          throw new Error('Invalid token.');
        });
        response = await sut.handle(request);
      });

      it('should return 401', () => {
        expect(response.statusCode).toBe(401);
      });

      it('should return message invalid token in body', () => {
        expect(response.body).toBe('Invalid token.');
      });
    });

    describe('and jwt throws a unhadled error', () => {
      let response: HttpResponse;
      let request: HttpRequest;

      beforeAll(async () => {
        request = {
          headers: {
            Authorization: 'Baerer token',
          },
          locals: {},
        };
        jest.spyOn(jwtStub, 'verify').mockImplementationOnce(() => {
          throw new Error();
        });
        response = await sut.handle(request);
      });

      it('should return 401', () => {
        expect(response.statusCode).toBe(500);
      });
    });
  });
});
