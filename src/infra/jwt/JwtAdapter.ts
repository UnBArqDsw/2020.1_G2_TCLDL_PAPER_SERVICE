import { Jwt } from '@data/protocols/Jwt';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Jwt {
  generate(data: any): string {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXP_TIME) {
      throw new Error('JWT envs are unseted, set secret an expiration time.');
    }

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP_TIME });
  }

  verify(data: string): any {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXP_TIME) {
      throw new Error('JWT envs are unseted, set secret an expiration time.');
    }

    try {
      console.log(jwt.verify);
      return jwt.verify(data, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token.');
    }
  }
}
