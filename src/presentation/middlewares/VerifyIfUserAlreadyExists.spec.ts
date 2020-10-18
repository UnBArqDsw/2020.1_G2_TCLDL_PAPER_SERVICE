import { User } from '@domain/entities/User';
import { FindUser } from '@domain/interactors/FindUser';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { VerifyIfUserAlreadyExists } from './VerifyIfUserAlreadyExists';

class FindUserStub implements FindUser {
  async execute(_parameter: string): Promise<User | undefined> {
    return undefined;
  }
}

describe('Find user by email middleware', () => {
  const findUserStub = new FindUserStub();
  const sut = new VerifyIfUserAlreadyExists(findUserStub);
  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      describe('and user not found', () => {
        let response: HttpResponse;
        let request: HttpRequest;
        beforeAll(async () => {
          request = {
            body: {
              email: 'user_email',
            },
          };
          response = await sut.handle(request);
        });

        it('should return 200', () => {
          expect(response.statusCode).toBe(200);
        });
      });
    });
  });
});
