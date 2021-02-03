import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import * as ResponseDecorator from '../common/response/response.decorator';
import { CreateLoanRequestDto, CreatePaymentRequestDto, LoanResponseDto, PaymentResponseDto } from './loans.dto';
import { LoansService } from './loans.service';

@Controller('loan')
export class LoansController {
  constructor(private readonly loanService: LoansService) { }

  @Post()
  @ApiOperation({
    operationId: 'loan-create',
    summary: 'Create',
    description: 'Create new loan',
    tags: ['Loan']
  })
  @ResponseDecorator.Created(LoanResponseDto)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  async create(@Body() req: CreateLoanRequestDto): Promise<LoanResponseDto> {
    return this.loanService.create(req);
  }

  @Get()
  @ApiOperation({
    operationId: 'loan-get',
    summary: 'Get',
    description: 'Get loan details',
    tags: ['Loan']
  })
  @ResponseDecorator.Successful(LoanResponseDto, true)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  async get(): Promise<LoanResponseDto> {
    return this.loanService.get();
  }

  @Post("payment")
  @ApiOperation({
    operationId: 'loan-payment',
    summary: 'Payment',
    description: 'Create new loan payment',
    tags: ['Loan']
  })
  @ResponseDecorator.Created(PaymentResponseDto)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  async payment(@Body() req: CreatePaymentRequestDto): Promise<PaymentResponseDto> {
    return this.loanService.payment(req);
  }

  @Get('balance')
  @ApiOperation({
    operationId: 'loan-balance',
    summary: 'Get',
    description: 'Get loan balance',
    tags: ['Loan']
  })
  @ResponseDecorator.Successful(LoanResponseDto)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  async getBalance(
    @Query('date') date: string,
  ): Promise<number> {
    return this.loanService.balance(date);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'loan-delete',
    summary: 'Delete',
    description: 'Delete loan details',
    tags: ['Loan']
  })
  @ResponseDecorator.Successful({})
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.Unauthorized()
  @ResponseDecorator.InternalServerError()
  @ResponseDecorator.BadGateway()
  async delete(): Promise<void> {
    return this.loanService.delete();
  }
}
