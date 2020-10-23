import { JwtGenerator } from '@data/protocols/JwtGenerator';
import jwt from 'jsonwebtoken';

export class JwtGeneratorAdapter implements JwtGenerator {
  generate(data: any): string {
    if (!process.env.JWT_SECRET || process.env.JWT_EXP_TIME) {
      throw new Error('JWT envs are unseted, set secret an expiration time.');
    }

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP_TIME });
  }
}
