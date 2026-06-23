import { Router } from "express";
import { createExpenseController } from "./controller";
import { ExpenseSvc } from "./service";

const router = Router();
const expenseController = createExpenseController(ExpenseSvc);

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getByCategoryDateRange);

export { router as expenseRouter };
