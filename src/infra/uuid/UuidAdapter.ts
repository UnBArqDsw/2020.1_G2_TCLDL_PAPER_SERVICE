import { UuidGenerator } from '@data/protocols/UuidGenerator';
import { v4 as uuidv4 } from 'uuid';

export class UuidAdapter implements UuidGenerator {
  generate() {
    return uuidv4();
  }
}
