import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionInputDto } from './dtos/create-transaction-input.dto';
import { IUser } from 'src/interfaces/user';
import { Tariff, Transaction, TransactionType } from '@prisma/client';
import { GetSummaryQueryInputDto } from './dtos/get-summary-query-input.dto';
import { ISummary } from 'src/interfaces/summary';
import { endsOfMonth, startsOfMonth } from './utils';
import { FREE_TARIFF_TX_LIMIT } from 'src/common/constants';
import { VALIDATION_MESSAGES } from 'src/common/constants/validation-messages';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateTransactionInputDto,
    user: IUser,
  ): Promise<Transaction> {
    const { amount, type, category, description } = data;

    const date = new Date();

    const result = await this.prisma.$transaction(async (tx) => {
      const from = startsOfMonth(date);
      const to = endsOfMonth(date);

      const count = await tx.transaction.count({
        where: {
          user_id: user.id,
          date: {
            gte: from,
            lte: to,
          },
        },
      });

      if (count >= FREE_TARIFF_TX_LIMIT) {
        throw new HttpException(VALIDATION_MESSAGES.upgradeTariff, 402);
      }

      const newTransaction = await tx.transaction.create({
        data: {
          user_id: user.id,
          telegram_id: user.telegram_id,
          amount,
          type,
          category,
          description,
          date,
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          transactions_count: { increment: 1 },
        },
      });

      return newTransaction;
    });

    return result;
  }

  async getSummary(
    user: IUser,
    query: GetSummaryQueryInputDto,
  ): Promise<ISummary> {
    const { from, to } = this.transformQueryForSummary(query, user);

    const summaryResult = await this.prisma.transaction.groupBy({
      by: ['type'],
      where: {
        user_id: user.id,
        date: {
          gte: from,
          lte: to,
        },
      },
      _sum: { amount: true },
    });

    let total_income: number = 0;
    let total_expense: number = 0;

    summaryResult.forEach(({ _sum, type }) => {
      const amount = _sum.amount ?? 0;

      if (type === TransactionType.income) {
        total_income += amount;
      } else {
        total_expense += amount;
      }
    });

    const balance = total_income - total_expense;

    return {
      total_income,
      total_expense,
      balance,
    };
  }

  async getTransactionsCount(startDate: Date, endDate: Date): Promise<number> {
    const transactionsCount = await this.prisma.transaction.count({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return transactionsCount;
  }

  private transformQueryForSummary(
    query: GetSummaryQueryInputDto,
    user: IUser,
  ): GetSummaryQueryInputDto {
    if (user.tariff === Tariff.pro) {
      return query;
    }

    const now = new Date();

    const from = startsOfMonth(now);
    const to = endsOfMonth(now);

    query.from = from;
    query.to = to;

    return query;
  }
}
