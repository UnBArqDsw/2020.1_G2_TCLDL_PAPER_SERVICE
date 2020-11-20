import { CreatePaper } from '@domain/interactors/paper/CreatePaper';
import { Controller } from '@presentation/protocols/Controller';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';

export class CreatePaperController implements Controller {
  private readonly createPaper: CreatePaper

  constructor(createUser: CreatePaper) {
    this.createPaper = createUser;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.createPaper.execute(
        { ...request.body, user: { id: request.params.userId } },
      );
      return ResponseHelper.successCreate(user);
    } catch (error) {
      return ResponseHelper.serverError();
    }
  }
}
