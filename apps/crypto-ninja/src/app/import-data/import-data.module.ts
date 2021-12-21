import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HolderController } from './controller/holder/holder.controller';
import { Holder } from './entities/holder.entity';
import { HolderService } from './services/holder/holder.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Holder])],
  controllers: [HolderController],
  providers: [HolderService],
})
export class ImportDataModule {}
