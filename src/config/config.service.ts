import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ProcessEnvService } from './process-env.service';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly processEnvService: ProcessEnvService,
  ) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql' as 'mysql',
      host: this.processEnvService.getEnvString('TYPEORM_HOST'),
      port: this.processEnvService.getEnvNumber('TYPEORM_PORT'),
      username: this.processEnvService.getEnvString('TYPEORM_USERNAME'),
      password: this.processEnvService.getEnvString('TYPEORM_PASSWORD'),
      database: this.processEnvService.getEnvString('TYPEORM_DATABASE'),
      entities: [this.processEnvService.getEnvString('PWD') + '/**/*.entity{.ts,.js}'],
      synchronize: this.processEnvService.getEnvBoolean('TYPEORM_SYNCHRONIZE'),
    };
  }
}
