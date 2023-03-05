import { Request, Response } from "express";
import { randomUUID } from "crypto";

import Transaction from "../entities/Transaction";

import prisma from "../database/prisma";

import { calculateExpenses } from "../utils/calculate-expenses";
import { calculateIncomes } from "../utils/calculate-incomes";
import { formatCurrency } from "../utils/format-currency";

class TransactionController {
  static async showTransactions(req: Request, res: Response) {
    const data = await prisma.transaction.findMany();
  
    const parsedTransactionsList = data.map(transaction => {
      const date = new Date(transaction.date).toLocaleString("pt-BR").split(",")[0];
      const CSSclass = transaction.amount > 0 ? "income" : "expense";
  
      return {
        ...transaction,
        date,
        CSSclass,
        formatedAmount: formatCurrency(transaction.amount)
      }
    });
  
    const income = calculateIncomes(data);
    const expense = calculateExpenses(data);
    const total = income + expense;
  
    const formatedIncomes = formatCurrency(income);
    const formatedExpense = formatCurrency(expense);
    const formatedTotal = formatCurrency(total);
  
    res.render('home', { 
      transactions: parsedTransactionsList, 
      income: formatedIncomes, 
      expense: formatedExpense, 
      total: formatedTotal
    });
  }

  static async createTransaction(req: Request, res: Response,) {
    const { description, amount, date } = req.body;

    const dateWithTIme = new Date(date + "T23:59:59");
  
    try {
      const transactionToSave = new Transaction({
        id: randomUUID(),
        amount: parseFloat(amount),
        description,
        date: new Date(dateWithTIme),
      });
  
      await prisma.transaction.create({
        data: transactionToSave.allProps
      });
    } catch (e: any) {
      console.log(e);
    } finally {
      res.redirect('/');
    }
  }

  static async removeTransaction(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.transaction.delete({
        where: {
          id
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      res.redirect('/');
    }
  }
}

export default TransactionController;