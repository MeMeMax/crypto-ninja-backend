import { Controller, Get } from '@nestjs/common';

import { lastValueFrom } from 'rxjs';

import { HolderService } from '../../services/holder/holder.service';

@Controller('holder')
export class HolderController {
  constructor(private holderService: HolderService) {}

  @Get('import')
  async getStockDetails() {
    const coins = (await lastValueFrom(this.holderService.getCoins())).data;

    for (let coin of coins) {
      if (coin.platforms && coin.platforms['binance-smart-chain']) {
        const holder = (
          await lastValueFrom(
            this.holderService.getTokenHolder(
              coin.platforms['binance-smart-chain']
            )
          )
        ).data.data.items.length;

        console.log(holder);
      }
    }
  }
}
