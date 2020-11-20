import { Paper } from '@domain/entities/Paper';
import { User } from '@domain/entities/User';
import { Interactor } from '@domain/protocols/Interactor';
import { AccuracyInformation } from '@domain/value_object/AccuracyInformation';
import { HardwareInformation } from '@domain/value_object/HardwareInformation';
import { ModelInformation } from '@domain/value_object/ModelInformation';

export interface CreatePaperAttribute
  extends Omit<
  Paper,
  'id' | 'createdAt' | 'updatedAt' | 'accuracyInformation' | 'hardwareInformation' |
  'modelInformation' | 'user'
  > {
  accuracyInformation: Omit<AccuracyInformation, 'id' | 'createdAt' | 'updatedAt'>
  hardwareInformation: Omit<HardwareInformation, 'id' | 'createdAt' | 'updatedAt'>
  modelInformation: Omit<ModelInformation, 'id' | 'createdAt' | 'updatedAt'>
  user: Pick<User, 'id'>
}

export interface CreatePaper extends Interactor<CreatePaperAttribute, Paper> {}
