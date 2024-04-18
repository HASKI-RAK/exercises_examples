//! Money Pattern
export type Money = {
  currency: string;
  amount: number;
  addition: (money: Money, toAdd: Money) => Money;
  subtract: (money: Money, toSubtract: Money) => Money;
  round: (money: Money, precision: number) => Money;
};

export const addition = (money: Money, toAdd: Money) => {
  return {
    currency: money.currency,
    amount: money.amount + toAdd.amount,
    addition: money.addition,
    subtract: money.subtract,
    round: money.round,
  };
};
export const subtract = (money: Money, toSubtract: Money) => {
  return {
    currency: money.currency,
    amount: money.amount - toSubtract.amount,
    addition: money.addition,
    subtract: money.subtract,
    round: money.round,
  };
};
export const round = (money: Money, precision: number) => {
  return {
    currency: money.currency,
    amount: Math.round(money.amount * Math.pow(10, precision)) / Math.pow(10, precision),
    addition: money.addition,
    subtract: money.subtract,
    round: money.round,
  };
};
