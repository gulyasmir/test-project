import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OneTimeLinkModule } from './modules/one-time-link/one-time-link.module';

@Module({
  imports: [OneTimeLinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
