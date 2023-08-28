import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schema/auth.schema';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    WalletModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule, UsersService],
})
export class UsersModule {}
