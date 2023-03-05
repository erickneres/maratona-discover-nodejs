import { TransactionProps } from "../entities/Transaction";

export function calculateIncomes(transactions: TransactionProps[]): number {
  let income = 0;

  transactions.forEach(transaction => {
    if (transaction.amount > 0) { 
      income += transaction.amount
    }
  });

  return income;
}