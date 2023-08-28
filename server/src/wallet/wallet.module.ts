import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schema/wallet.model';

@Module({
  controllers: [WalletController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Wallet',
        schema: WalletSchema,
      },
    ]),
  ],
  providers: [
    WalletService,
    {
      provide: 'walletService',
      useClass: WalletService,
    },
  ],
  exports: [WalletService, MongooseModule],
})
export class WalletModule {}
