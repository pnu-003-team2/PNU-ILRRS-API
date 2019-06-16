import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ProcessEnvService } from './process-env.service';

@Global()
@Module({
  providers: [ConfigService, ProcessEnvService],
  exports: [ConfigService],
})
export class ConfigModule {
}
