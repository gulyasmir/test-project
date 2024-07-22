import { Module } from '@nestjs/common';
import { OneTimeLinkService } from './one-time-link.service';
import { OneTimeLinkController } from './one-time-link.controller';

@Module({
  controllers: [OneTimeLinkController],
  providers: [OneTimeLinkService],
})
export class OneTimeLinkModule {}
