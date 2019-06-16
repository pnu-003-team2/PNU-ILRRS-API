import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessEnvService {
  getEnvString(key: string): string {
    return process.env[key];
  }

  getEnvNumber(key: string): number {
    return parseInt(process.env[key], 10);
  }

  getEnvBoolean(key: string): boolean {
    return process.env[key].toLowerCase() === 'true';
  }
}
