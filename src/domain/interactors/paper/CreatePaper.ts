import { Paper } from '@domain/entities/PaperInformation';

export interface CreatePaper {
  execute: (data: Paper) => Promise<Paper>
}
