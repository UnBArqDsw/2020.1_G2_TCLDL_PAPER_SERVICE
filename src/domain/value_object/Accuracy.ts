import { AccuracyType } from '@domain/agreggates/AccuracyType';

export interface Accuracy extends AccuracyType{
  id: number;
  //type: 'admin' | 'sub_admin' | 'collab' ;
  accuracy: number;
}
