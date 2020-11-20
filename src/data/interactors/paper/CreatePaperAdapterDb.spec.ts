import { DateGenerator } from '@data/protocols/DateGenerator';
import { UuidGenerator } from '@data/protocols/UuidGenerator';
import { CreatePaperRepository } from '@data/repositories/paper/CreatePaperRepository';
import { FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { Paper } from '@domain/entities/Paper';
import { User } from '@domain/entities/User';
import { CreatePaperAttribute } from '@domain/interactors/paper/CreatePaper';
import { CreatePaperAdapterDb } from './CreatePaperAdapterDb';

class CreatePaperRepositoryStub implements CreatePaperRepository {
  async execute(data: Paper): Promise<Paper> {
    return data;
  }
}

class FindUserRepositoryStub implements FindUserRepository {
  async execute(
    data: Partial<Pick<User, 'id' | 'name' | 'lastName' | 'email' | 'password' | 'role'>>,
  ): Promise<User | undefined> {
    return {
      id: 'valid_id',
      name: 'valid_name',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
      createdAt: 'valid_createdAt',
      updatedAt: 'valid_updatedAt',
      ...data,
    };
  }
}

class UuidGeneratorStub implements UuidGenerator {
  generate(): string {
    return 'valid_uuid';
  }
}

class DateGeneratorStub implements DateGenerator {
  generate(): string {
    return 'valid_date';
  }
}

describe('Paper Adapter', () => {
  const createPaperRepositoryStub = new CreatePaperRepositoryStub();
  const findUserRepository = new FindUserRepositoryStub();
  const uuidGeneratorStub = new UuidGeneratorStub();
  const dateGeneratorStub = new DateGeneratorStub();
  const sut = new CreatePaperAdapterDb(
    createPaperRepositoryStub, uuidGeneratorStub, dateGeneratorStub, findUserRepository,
  );

  const parameter: CreatePaperAttribute = {
    name: 'valid_name',
    author: 'valid_author',
    dateSubmission: new Date(2020, 10, 10),
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
  };

  describe('when calls execute', () => {
    describe('and promise resolves', () => {
      let result: Paper;

      beforeAll(async () => {
        result = await sut.execute(parameter);
      });

      it('should return created paper', () => {
        expect(result).toEqual({
          ...parameter,
          id: 'valid_uuid',
          createdAt: 'valid_date',
          updatedAt: 'valid_date',
          accuracyInformation: {
            ...parameter.accuracyInformation,
            id: 'valid_uuid',
            createdAt: 'valid_date',
            updatedAt: 'valid_date',
          },
          modelInformation: {
            ...parameter.modelInformation,
            id: 'valid_uuid',
            createdAt: 'valid_date',
            updatedAt: 'valid_date',
          },
          hardwareInformation: {
            ...parameter.hardwareInformation,
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
    });

    describe('and uuid generator throws', () => {
      let result: Promise<Paper>;

      beforeAll(async () => {
        jest.spyOn(uuidGeneratorStub, 'generate').mockImplementationOnce(() => {
          throw new Error();
        });
        result = sut.execute(parameter);
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });

    describe('and date generator throws', () => {
      let result: Promise<Paper>;

      beforeAll(async () => {
        jest.spyOn(dateGeneratorStub, 'generate').mockImplementationOnce(() => {
          throw new Error();
        });
        result = sut.execute(parameter);
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });

    describe('and create paper repository throws', () => {
      let result: Promise<Paper>;

      beforeAll(async () => {
        jest.spyOn(createPaperRepositoryStub, 'execute').mockRejectedValueOnce(new Error());
        result = sut.execute(parameter);
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });

    describe('and find user repository throws', () => {
      let result: Promise<Paper>;

      beforeAll(async () => {
        jest.spyOn(findUserRepository, 'execute').mockRejectedValueOnce(new Error());
        result = sut.execute(parameter);
      });

      it('should throws', () => {
        expect(result).rejects.toThrow();
      });
    });
  });
});
