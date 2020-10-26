import { Encrypter } from '@data/protocols/Encrypter';
import bcrypt from 'bcrypt';

export class EncrypterAdapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, process.env.BCRYPT_SALT || 12);
  }
}
