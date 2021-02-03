import { ApiProperty } from "@nestjs/swagger";
import {
  CreateLoanRequest, CreatePaymentRequest, LoanResponse, Payment, PaymentResponse,
} from "./loans.interfaces";

export class LoanResponseDto implements LoanResponse {
  @ApiProperty({
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    type: 'number',
  })
  rate: number;

  @ApiProperty({
    type: 'string',
    format: 'date',
  })
  date: Date;

  payments: Payment[];
}

export class CreateLoanRequestDto implements CreateLoanRequest {
  @ApiProperty({
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    type: 'number',
  })
  rate: number;

  @ApiProperty({
    type: 'string',
    format: 'date',
  })
  date: Date;
}

export class PaymentResponseDto implements PaymentResponse {
  @ApiProperty({
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    type: 'number',
  })
  afterInterest: number;

  @ApiProperty({
    type: 'string',
    format: 'date',
  })
  date: Date;
}

export class CreatePaymentRequestDto implements CreatePaymentRequest {
  @ApiProperty({
    type: 'number',
  })
  amount: number;

  @ApiProperty({
    type: 'string',
    format: 'date',
  })
  date: Date;
}
