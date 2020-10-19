import { RemoveUser } from '@domain/interactors/RemoveUser';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { RemoveUserController } from './RemoveUserController';

class RemoveUserStub implements RemoveUser {
  // eslint-disable-next-line no-empty-function
  async execute(_params: string) {}
}

describe('Remove user controller', () => {
  const removeUserStub = new RemoveUserStub();
  const sut = new RemoveUserController(removeUserStub);
  describe('when calls handle', () => {
    describe('and promise resolves', () => {
      const httpRequest: HttpRequest = {
        params: 'valid_id',
      };
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(removeUserStub, 'execute');
        httpResponse = await sut.handle(httpRequest);
      });

      test('should return 204', () => {
        expect(httpResponse.statusCode).toBe(204);
      });
    });
  });
});
