import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionInputDto } from './dtos/create-transaction-input.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SWAGGER_AUTH } from 'src/common/constants';
import { USER } from 'src/common/decorators/user.decorator';
import type { IUser } from 'src/interfaces/user';
import { GetSummaryQueryInputDto } from './dtos/get-summary-query-input.dto';

@ApiBearerAuth(SWAGGER_AUTH)
@Auth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() data: CreateTransactionInputDto, @USER() user: IUser) {
    return this.transactionService.create(data, user);
  }

  @Get('summary')
  getSummary(@USER() user: IUser, @Query() query: GetSummaryQueryInputDto) {
    return this.transactionService.getSummary(user, query);
  }
}
