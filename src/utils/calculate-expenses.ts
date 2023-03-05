import { TransactionProps } from "../entities/Transaction";

export function calculateExpenses(transactions: TransactionProps[]): number {
  let expense = 0;

  transactions.forEach(transaction => {
    if (transaction.amount < 0) {
      expense += transaction.amount;
    }
  });

  return expense;
}