import { Paper } from '@domain/entities/Paper';
import { Interactor } from '@domain/protocols/Interactor';

export interface CreatePaper extends Interactor<Paper> {}
