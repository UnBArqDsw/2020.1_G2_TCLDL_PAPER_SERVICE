import { AccuracyType } from '@domain/agreggates/AccuracyType';

export interface Paper extends AccuracyType{
  id: string
  paperName: string
  author: string
  domain: string
  paperLink: string
}
