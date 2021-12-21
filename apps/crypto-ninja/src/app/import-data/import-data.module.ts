import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HolderController } from './controller/holder/holder.controller';
import { HolderService } from './services/holder/holder.service';

@Module({
  imports: [HttpModule],
  controllers: [HolderController],
  providers: [HolderService],
})
export class ImportDataModule {}
