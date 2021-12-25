import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { Holder } from '../../entities/holder.entity';

@Injectable()
export class HolderService {
  constructor(private http: HttpService, @InjectRepository(Holder) private holderRepo: Repository<Holder>) {}

  addHolder(coinId: string, name: string, symbol: string, amount: number) {
    const date = new Date();
    return this.holderRepo.upsert(
      {
        coinId,
        name,
        symbol,
        amount,
        day: date.getUTCDate(),
        month: date.getUTCMonth() + 1,
        year: date.getUTCFullYear()
      },
      ['coinId', 'day', 'month', 'year']
    );
  }

  getCoins(): Observable<AxiosResponse<any>> {
    return this.http.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
  }

  getTokenHolder(contractAddress: string): Observable<AxiosResponse<any>> {
    return this.http.get(
      `https://api.covalenthq.com/v1/56/tokens/${contractAddress}/token_holders/?key=ckey_87ff18dff9cb4d639a6960c2db0&page-size=2000000000`
    );
  }

  getHolderDataFromToday() {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth() + 1;
    const year = new Date().getUTCFullYear();
    return this.holderRepo
      .createQueryBuilder()
      .select('coinId')
      .where('day = :day AND month = :month AND year = :year', {
        day,
        month,
        year
      })
      .getRawMany();
  }
}
