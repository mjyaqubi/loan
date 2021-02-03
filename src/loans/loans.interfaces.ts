export type Loan = {
  amount: number;
  rate: number;
  date: Date;
  payments: Payment[];
}

export type LoanResponse = Loan;

export type CreateLoanRequest = {
  amount: number;
  rate: number;
  date: Date;
};

export type Payment = {
  amount: number;
  afterInterest: number;
  date: Date;
}

export type PaymentResponse = Payment;

export type CreatePaymentRequest = {
  amount: number;
  date: Date;
}
