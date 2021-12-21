import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { Holder } from '../../entities/holder.entity';

@Injectable()
export class HolderService {
  constructor(
    private http: HttpService,
    @InjectRepository(Holder) private holderRepo: Repository<Holder>
  ) {}

  addHolder(coinId: string, name: string, symbol: string, amount: number) {
    return this.holderRepo
      .createQueryBuilder()
      .insert()
      .values({ coinId, name, symbol, amount })
      .execute();
  }

  getCoins(): Observable<AxiosResponse<any>> {
    return this.http.get(
      'https://api.coingecko.com/api/v3/coins/list?include_platform=true'
    );
  }

  getTokenHolder(contractAddress: string): Observable<AxiosResponse<any>> {
    return this.http.get(
      `https://api.covalenthq.com/v1/56/tokens/${contractAddress}/token_holders/?key=ckey_87ff18dff9cb4d639a6960c2db0&page-size=2000000000`
    );
  }

  getHolderDataFromToday() {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    return this.holderRepo
      .createQueryBuilder()
      .select('coinId')
      .where(
        'DAY(date) = :day AND MONTH(date) = :month AND YEAR(date) = :year',
        { day, month, year }
      )
      .getRawMany();
  }
}
