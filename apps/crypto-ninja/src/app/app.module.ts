import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportDataModule } from './import-data/import-data.module';

@Module({
  imports: [ImportDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
