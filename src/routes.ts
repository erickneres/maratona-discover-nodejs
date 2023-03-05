import { Router } from "express";

const routes = Router();

import TransactionController from "./controllers/TransactionController";

routes.get('/', TransactionController.showTransactions);
routes.post('/transactions/add', TransactionController.createTransaction);
routes.post('/transactions/:id/remove', TransactionController.removeTransaction);

export default routes;