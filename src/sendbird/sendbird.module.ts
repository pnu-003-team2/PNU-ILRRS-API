import { Module, HttpModule } from '@nestjs/common';
import { SendbirdService } from './sendbird.service';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [SendbirdService],
  exports: [SendbirdService],
})
export class SendbirdModule {}
