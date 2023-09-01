import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Card } from './schemas/card.schemas';
import { Bank } from './schemas/bank.schema';
import { DepositDtoWallet } from './dto/deposit-wallet.dto';
@Injectable()
export class PaymentService {
  constructor(
    private readonly userService: UsersService,
    private readonly walletService: WalletService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>
  ) { }
  
  async depositToWalletUsingCardOrBank(userId: string, depositDtoWallet: DepositDtoWallet, walletId: string) {
    const { paymentType, numberAccount, depositAmount } = depositDtoWallet;

    const user = await this.userModel.findById(userId).populate('walletId');
    if (!user) {
        throw new NotFoundException('Usuario no encontrado');
    }

    const wallet = await this.walletService.findById(walletId);

    // Encuentra el método de pago (ya sea tarjeta o cuenta bancaria)
    let paymentMethod;
    if (paymentType === 'card') {
        paymentMethod = user.paymentMethods.find(payment => payment.card.cardNumber === numberAccount);
        if (!paymentMethod) {
            throw new NotFoundException('Tarjeta no encontrada');
        }
    } else if (paymentType === 'bank') {
        paymentMethod = user.paymentMethods.find(payment => payment.bankAccount.accountNumber === numberAccount);
        if (!paymentMethod) {
            throw new NotFoundException('Cuenta de banco no encontrada');
        }
    } else {
        throw new NotFoundException('Método de pago no válido');
    }


    // Procesa el pago utilizando el método de pago (ya sea tarjeta o cuenta bancaria) aun no lo hare
    // (se quita el monto a la targe o al banco)

    // Realiza la operación de depósito en la billetera
    const deposit = await this.walletService.operationsWallet(userId, depositAmount, 'deposit');

    // Crea una transacción para el registro
    const transaction = new this.transactionModel({
        type: 'deposit',
        paymentMethods: paymentMethod._id,
        wallet: walletId,
        amount: depositAmount,
    });

    await Promise.all([transaction.save(), wallet.save()]);
    console.log(transaction)
    return user;
}

  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    try {
        // Encuentra al usuario por su ID
        const user = await this.userModel.findById(userId).populate('walletId');
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Obtiene todas las transacciones relacionadas con la persona que hizo la transaccion del usuario
        const transactions = await this.transactionModel.find({ paymentMethods: user.paymentMethods });

        return transactions;
    } catch (error) {
        throw error;
    }
}
}
