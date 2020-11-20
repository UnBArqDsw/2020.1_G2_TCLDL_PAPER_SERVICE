import { CreatePaper, CreatePaperAttribute } from '@domain/interactors/paper/CreatePaper';
import { Paper } from '@domain/entities/Paper';
import { CreatePaperRepository } from '@data/repositories/paper/CreatePaperRepository';
import { UuidGenerator } from '@data/protocols/UuidGenerator';
import { DateGenerator } from '@data/protocols/DateGenerator';
import { FindUserRepository } from '@data/repositories/user/FindUserRepository';

export class PaperAdapterDb implements CreatePaper {
  private readonly createPaperRepository: CreatePaperRepository

  private readonly findUserRepository: FindUserRepository

  private readonly uuidGenerator: UuidGenerator

  private readonly dateGenerator: DateGenerator

  constructor(
    createPaperRepository: CreatePaperRepository,
    uuidGenerator: UuidGenerator,
    dateGenerator: DateGenerator,
    findUserRepository: FindUserRepository,
  ) {
    this.createPaperRepository = createPaperRepository;
    this.uuidGenerator = uuidGenerator;
    this.dateGenerator = dateGenerator;
    this.findUserRepository = findUserRepository;
  }

  async execute(data: CreatePaperAttribute): Promise<Paper> {
    const paperUuid = this.uuidGenerator.generate();
    const accuracyUuid = this.uuidGenerator.generate();
    const modelUuid = this.uuidGenerator.generate();
    const hardwareUuid = this.uuidGenerator.generate();

    const createdAt = this.dateGenerator.generate();

    const accuracyInformation = {
      id: accuracyUuid,
      accuracy: data.accuracyInformation.accuracy,
      createdAt,
      updatedAt: createdAt,
    };

    const modelInformation = {
      ...data.modelInformation,
      id: modelUuid,
      createdAt,
      updatedAt: createdAt,
    };

    const hardwareInformation = {
      ...data.hardwareInformation,
      id: hardwareUuid,
      createdAt,
      updatedAt: createdAt,
    };

    const user = await this.findUserRepository.execute({ id: data.user.id });

    return this.createPaperRepository.execute({
      ...data,
      id: paperUuid,
      createdAt,
      updatedAt: createdAt,
      accuracyInformation,
      modelInformation,
      hardwareInformation,
      user,
    });
  }
}
