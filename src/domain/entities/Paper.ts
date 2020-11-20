import { PaperAccuracy } from '@domain/aggregates/PaperAccuracy';
import { PaperHardware } from '@domain/aggregates/PaperHardware';
import { PaperModel } from '@domain/aggregates/PaperModel';
import { PaperUser } from '@domain/aggregates/PaperUser';

export interface Paper extends PaperAccuracy, PaperHardware, PaperModel, PaperUser {
  id: string
  name: string
  author: string
  dateSubmission: Date
  link: string
  codeLink: string
  domain: string
  dataset: string
  modelName: string
  createdAt: string
  updatedAt: string
}
