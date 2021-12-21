import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportDataModule } from './import-data/import-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'crypto-ninja',
      password: 'crypto-ninja112358',
      database: 'crypto-ninja',
      bigNumberStrings: false,
      cache: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      dateStrings: true,
    }),
    ImportDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
