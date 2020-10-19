import { RemoveUserRepository } from '@data/repositories/RemoveUserRepository';
import { serverError, successRemove } from '@presentation/helpers/HttpHelper';
import { Controller } from '@presentation/protocols/Controller';
import { HttpRequest } from '@presentation/protocols/Http';

export class RemoveUserController implements Controller {
  private readonly removeUserRepository: RemoveUserRepository

  constructor(removeUserRepository: RemoveUserRepository) {
    this.removeUserRepository = removeUserRepository;
  }

  async handle(request: HttpRequest) {
    const { userId } = request.params;
    try {
      await this.removeUserRepository.execute(userId);
      return successRemove();
    } catch (error) {
      return serverError();
    }
  }
}
