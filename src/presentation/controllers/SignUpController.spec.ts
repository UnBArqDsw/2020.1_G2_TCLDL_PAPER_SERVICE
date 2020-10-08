import { IHttpRequest, IHttpResponse } from '../protocols/IHttp';
import { SignUpController } from './SignUpController';

describe('SignUpController', () => {
  const sut = new SignUpController();
  let httpRequest: IHttpRequest;
  let httpResponse: IHttpResponse;
  describe('when handle execute', () => {
    describe('and promise resolves', () => {
      beforeAll(async () => {
        httpRequest = {
          body: {
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            password_confirmation: 'valid_password',
          },
        };
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return status code 200', () => {
        expect(httpResponse.statusCode).toBe(200);
      });
    });
  });
});
