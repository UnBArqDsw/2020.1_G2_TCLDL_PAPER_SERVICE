import { PaperAccuracy } from '@domain/aggregates/PaperAccuracy';
import { PaperHardware } from '@domain/aggregates/PaperHardware';
import { PaperModel } from '@domain/aggregates/PaperModel';

export interface Paper extends PaperAccuracy, PaperHardware, PaperModel {
  id: string
  name: string
  author: string
  date: Date
  link: string
  codeLink: string
  domain: string
  dataset: string
  modelName: string
}
