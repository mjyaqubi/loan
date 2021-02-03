import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { dateValidator, diffDays } from '../common/utils/utils.helper';
import {
  Loan,
  Payment,
  LoanResponse,
  PaymentResponse,
  CreateLoanRequest,
  CreatePaymentRequest,
} from './loans.interfaces';

@Injectable()
export class LoansService {
  private loan: Loan;

  _rateCalculator(rate: number, amount: number, start: string, end: string) {
    const days = diffDays(start, end);
    if (days === -1) {
      throw new BadRequestException()
    }
    return rate / 100 / 365 * days * amount;
  }

  create(req: CreateLoanRequest): LoanResponse {
    if (req.amount <= 0 || req.rate <= 0 || !dateValidator(req.date.toString())) {
      throw new BadRequestException()
    }

    this.loan = <Loan>{
      amount: req.amount,
      rate: req.rate,
      date: req.date,
      payments: []
    }

    return this.loan;
  }

  get(): LoanResponse {
    if(!this.loan || !this.loan.amount) {
      throw new NotFoundException()
    }

    return this.loan;
  }

  payment(req: CreatePaymentRequest): PaymentResponse {
    if(!this.loan || !this.loan.amount || !dateValidator(req.date.toString())) {
      throw new NotFoundException()
    }

    const interest = this._rateCalculator(
      this.loan.rate,
      req.amount,
      this.loan.date.toString(),
      req.date.toString()
    );

    const payment = <Payment>{
      amount: req.amount,
      afterInterest: req.amount - interest,
      date: req.date
    }
    this.loan.payments.push(payment)
    return payment;
  }

  balance(date: string): number {
    if (!dateValidator(date)) {
      throw new BadRequestException()
    }

    let totalPayed = 0;
    this.loan.payments.forEach(i => {
      totalPayed += i.date.toString() <= date ? i.afterInterest : 0;
    })

    const remainingLoan = this.loan.amount - totalPayed;
    const remainingInterest = this._rateCalculator(
      this.loan.rate,
      remainingLoan,
      this.loan.date.toString(),
      date,
    )
    
    return remainingLoan + remainingInterest;
  }

  async delete() {
    this.loan = null;
    return;
  }
}
