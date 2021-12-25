import { Controller, Get } from '@nestjs/common';

import { lastValueFrom } from 'rxjs';

import { HolderService } from '../../services/holder/holder.service';

@Controller('holder')
export class HolderController {
  constructor(private holderService: HolderService) {}

  @Get('import')
  async getStockDetails() {
    let coins = (await lastValueFrom(this.holderService.getCoins())).data;
    const existingHolderData =
      await this.holderService.getHolderDataFromToday();
    coins = coins.filter((coin) => {
      return !existingHolderData.find((existingCoin) => {
        return existingCoin.coinId === coin.id;
      });
    });

    for (let coin of coins) {
      try {
        if (coin.platforms && coin.platforms['binance-smart-chain']) {
          const holderAmount = (
            await lastValueFrom(
              this.holderService.getTokenHolder(
                coin.platforms['binance-smart-chain']
              )
            )
          ).data.data.items.length;

          await this.holderService.addHolder(
            coin.id,
            coin.name,
            coin.symbol,
            holderAmount
          );
        }
      } catch (err) {
        console.log(`${coin.id} failed.`);
      }
    }
  }
}
