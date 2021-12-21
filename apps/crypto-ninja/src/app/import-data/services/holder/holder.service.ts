import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class HolderService {
  constructor(private http: HttpService) {}

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
}
