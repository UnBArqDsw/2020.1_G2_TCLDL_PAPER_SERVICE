import { FindUserRepository } from '@data/repositories/FindUserRepository';
import { notFound, successRequest } from '@presentation/helpers/HttpHelper';
import { HttpRequest } from '@presentation/protocols/Http';
import { Middleware } from '@presentation/protocols/Middleware';

export class FindUserMiddleware implements Middleware {
  private readonly findUserRepository: FindUserRepository

  constructor(findUserRepository: FindUserRepository) {
    this.findUserRepository = findUserRepository;
  }

  async handle(request: HttpRequest) {
    const userId = request.params;

    const user = await this.findUserRepository.execute(userId);

    if (!user) {
      return notFound('user');
    }

    return successRequest('ok');
  }
}
