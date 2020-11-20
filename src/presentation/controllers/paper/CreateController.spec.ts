import { Paper } from '@domain/entities/Paper';
import { CreatePaper, CreatePaperAttribute } from '@domain/interactors/paper/CreatePaper';
import { ServerError } from '@presentation/errors/ServerError';
import { HttpRequest, HttpResponse } from '@presentation/protocols/Http';
import { CreatePaperController } from './CreatePaperController';

class CreatePaperStub implements CreatePaper {
  async execute(data: CreatePaperAttribute): Promise<Paper> {
    return {
      ...data,
      id: 'valid_uuid',
      createdAt: 'valid_date',
      updatedAt: 'valid_date',
      accuracyInformation: {
        ...data.accuracyInformation,
        id: 'valid_uuid',
        createdAt: 'valid_date',
        updatedAt: 'valid_date',
      },
      modelInformation: {
        ...data.modelInformation,
        id: 'valid_uuid',
        createdAt: 'valid_date',
        updatedAt: 'valid_date',
      },
      hardwareInformation: {
        ...data.hardwareInformation,
        id: 'valid_uuid',
        createdAt: 'valid_date',
        updatedAt: 'valid_date',
      },
      user: {
        id: 'valid_id',
        name: 'valid_name',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
        createdAt: 'valid_createdAt',
        updatedAt: 'valid_updatedAt',
      },
    };
  }
}

describe('CreatePaperController', () => {
  const createPaperStub = new CreatePaperStub();
  const sut = new CreatePaperController(createPaperStub);
  describe('when handle execute', () => {
    describe('and promise resolves', () => {
      let httpRequest: HttpRequest;
      let httpResponse: HttpResponse;
      const createPaperSpy = jest.spyOn(createPaperStub, 'execute');

      beforeAll(async () => {
        httpRequest = {
          params: {
            userId: 'valid_id',
          },
          body: {
            name: 'valid_name',
            author: 'valid_author',
            date: new Date(2020, 10, 10),
            link: 'valid_link',
            codeLink: 'valid_codeLink',
            domain: 'valid_domain',
            dataset: 'valid_dataset',
            modelName: 'valid_modelName',
            accuracyInformation: {
              accuracy: 'valid_accuracy',
            },
            modelInformation: {
              trainingTime: 'valid_trainingTime',
              trainingDataSize: 'valid_trainingDataSize',
              epochs: 'valid_epochs',
            },
            hardwareInformation: {
              cpuModel: 'valid_cpuModel',
              cpuCores: 1,
              cpuGflops: 'valid_cpuGflops',
              gpuModel: 'valid_gpuModel',
              gpuCores: 1,
              gpuGflops: 'valid_gpuGflops',
              tpuModel: 'valid_tpuModel',
              tpuCores: 1,
              tpuGflops: 'valid_tpuGflops',
            },
            user: {
              id: 'valid_id',
            },
          },
        };
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return status code 200', () => {
        expect(httpResponse.statusCode).toBe(201);
      });

      it('should return paper info', () => {
        expect(httpResponse.body).toEqual({
          ...httpRequest.body,
          id: 'valid_uuid',
          createdAt: 'valid_date',
          updatedAt: 'valid_date',
          accuracyInformation: {
            ...httpRequest.body.accuracyInformation,
            id: 'valid_uuid',
            createdAt: 'valid_date',
            updatedAt: 'valid_date',
          },
          modelInformation: {
            ...httpRequest.body.modelInformation,
            id: 'valid_uuid',
            createdAt: 'valid_date',
            updatedAt: 'valid_date',
          },
          hardwareInformation: {
            ...httpRequest.body.hardwareInformation,
            id: 'valid_uuid',
            createdAt: 'valid_date',
            updatedAt: 'valid_date',
          },
          user: {
            id: 'valid_id',
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            createdAt: 'valid_createdAt',
            updatedAt: 'valid_updatedAt',
          },
        });
      });

      it('should call createPaper with correct params', () => {
        expect(createPaperSpy).toHaveBeenCalledWith(httpRequest.body);
      });
    });

    describe('and promise rejects', () => {
      let httpRequest: HttpRequest;
      let httpResponse: HttpResponse;

      beforeAll(async () => {
        jest.spyOn(createPaperStub, 'execute').mockRejectedValueOnce('Error');
        httpRequest = {
          params: {
            userId: 'valid_id',
          },
          body: {
            name: 'valid_name',
            author: 'valid_author',
            date: new Date(2020, 10, 10),
            link: 'valid_link',
            codeLink: 'valid_codeLink',
            domain: 'valid_domain',
            dataset: 'valid_dataset',
            modelName: 'valid_modelName',
            accuracyInformation: {
              accuracy: 'valid_accuracy',
            },
            modelInformation: {
              trainingTime: 'valid_trainingTime',
              trainingDataSize: 'valid_trainingDataSize',
              epochs: 'valid_epochs',
            },
            hardwareInformation: {
              cpuModel: 'valid_cpuModel',
              cpuCores: 1,
              cpuGflops: 'valid_cpuGflops',
              gpuModel: 'valid_gpuModel',
              gpuCores: 1,
              gpuGflops: 'valid_gpuGflops',
              tpuModel: 'valid_tpuModel',
              tpuCores: 1,
              tpuGflops: 'valid_tpuGflops',
            },
            user: {
              id: 'valid_id',
            },
          },
        };
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return 500 if throws', () => {
        expect(httpResponse.statusCode).toBe(500);
      });

      it('should return message error', () => {
        expect(httpResponse.body).toEqual(new ServerError().message);
      });
    });
  });
});
