import { CreatePaper } from '@domain/interactors/paper/CreatePaper';
import { Paper } from '@domain/entities/PaperInformation';
import { PaperRepository } from '@data/repositories/paper/PaperRepository';
import { UuidGenerator } from '@data/protocols/UuidGenerator';


export class PaperAdapter implements CreatePaper {
  
  private readonly createPaperRepository: PaperRepository
  
  private readonly uuidGenerator: UuidGenerator

  constructor(createPaperRepository: PaperRepository,  uuidGenerator: UuidGenerator) {
    this.createPaperRepository = createPaperRepository;
    this.uuidGenerator = uuidGenerator;
  }

  async execute(data: Paper) : Promise<Paper> {
    
    const uuid = this.uuidGenerator.generate();

    return this.createPaperRepository.execute({
      id: uuid,
    });
  }
}