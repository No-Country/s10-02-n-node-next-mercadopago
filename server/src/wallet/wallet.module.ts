import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schema/wallet.model';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Wallet',
        schema: WalletSchema,
      },
    ]),
  ],
})
export class WalletModule {}
