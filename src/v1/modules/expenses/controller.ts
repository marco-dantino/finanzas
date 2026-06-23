import type { Request, Response } from "express";
import type { SuccessResponse } from "@/v1/types";
import type { Expense, IExpenseService } from "./types";

export function createExpenseController(svc: IExpenseService) {
	async function createExpense(req: Request, res: Response) {
		const newExpense: Omit<Expense, "id" | "date"> = req.body;

		const expense: Expense = svc.createExpense(newExpense);

		const response: SuccessResponse = {
			data: expense,
			message: "Gasto creado",
			success: true,
		};

		return res.status(201).json(response);
	}

	async function getByCategoryDateRange(req: Request, res: Response) {
		const { category, from, to } = req.query as {
			category: string;
			from: string;
			to: string;
		};

		const expenseFiltered: Expense[] = svc.getByCategoryDateRange(
			category,
			from,
			to,
		);

		const response: SuccessResponse = {
			data: expenseFiltered,
			message: "Gastos filtrados",
			success: true,
		};

		return res.status(200).json(response);
	}

	return {
		createExpense,
		getByCategoryDateRange,
	};
}
