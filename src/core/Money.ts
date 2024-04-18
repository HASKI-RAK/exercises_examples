//! Money Pattern
export type MoneyType = {
  currency: string;
  amount: number;
  conversionRate?: number;
  addition: (toAdd: MoneyType) => MoneyType;
  subtract: (toSubtract: MoneyType) => MoneyType;
  round: (precision: number) => MoneyType;
};

export class Money implements MoneyType {
  currency: string;
  amount: number;

  constructor(currency: string, amount: number) {
    this.currency = currency;
    this.amount = amount;
  }

  addition(toAdd: MoneyType) {
    return new Money(this.currency, this.amount + toAdd.amount);
  }

  subtract(toSubtract: MoneyType) {
    return new Money(this.currency, this.amount - toSubtract.amount);
  }

  round(precision: number) {
    return new Money(this.currency, Math.round(this.amount * precision) / precision);
  }
}
