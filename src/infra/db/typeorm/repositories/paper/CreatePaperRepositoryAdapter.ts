import { CreatePaperRepository } from '@data/repositories/paper/CreatePaperRepository';
import { Paper } from '@domain/entities/Paper';
import { getRepository } from 'typeorm';
import { AccuracyInformationAdapter } from '../../entities/AccuracyInformationAdapter';
import { HardwareInformationAdapter } from '../../entities/HardwareInformationAdapter';
import { ModelInformationAdapter } from '../../entities/ModelInformationAdapter';
import { PaperAdapter } from '../../entities/PaperAdapter';

export class CreatePaperRepositoryAdapter implements CreatePaperRepository {
  async execute(data: Paper): Promise<Paper> {
    const paperRepository = getRepository(PaperAdapter);
    const accuracyInformationRepository = getRepository(AccuracyInformationAdapter);
    const hardwareInformationRepository = getRepository(HardwareInformationAdapter);
    const modelInformationRepository = getRepository(ModelInformationAdapter);

    if (!data.accuracyInformation || !data.hardwareInformation || !data.modelInformation) {
      throw new Error('missing values.');
    }

    await Promise.all([accuracyInformationRepository.save(
      new AccuracyInformationAdapter(data.accuracyInformation),
    ),
    hardwareInformationRepository.save(
      new HardwareInformationAdapter(data.hardwareInformation),
    ),
    modelInformationRepository.save(
      new ModelInformationAdapter(data.modelInformation),
    ),
    ]);

    const paper = new PaperAdapter(data);
    await paperRepository.save(paper);

    return paperRepository.findOneOrFail({
      where: { id: paper.id },
      relations: [
        'accuracyInformation',
        'hardwareInformation',
        'modelInformation',
      ],
    });
  }
}
