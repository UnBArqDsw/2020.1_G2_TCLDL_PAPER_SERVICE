import { Paper } from '@domain/entities/PaperInformation';

export interface PaperRepository {
  execute: (data: Paper) => Promise<Paper>;
}