import { HttpError, NotFoundHttpError } from "@/v1/res/errors";
import type { Expense, IExpenseService } from "./types";

class Service implements IExpenseService {
	private expenses: Expense[] = [
		{
			id: "e001",
			date: "2026-04-18T09:00:00.000Z",
			category: "goods",
			description: "Weekly wholesale purchase",
			amount: 85000,
		},
		{
			id: "e002",
			date: "2026-04-11T09:00:00.000Z",
			category: "goods",
			description: "Weekly wholesale purchase",
			amount: 78000,
		},
		{
			id: "e003",
			date: "2026-04-04T09:00:00.000Z",
			category: "goods",
			description: "Weekly wholesale purchase",
			amount: 92000,
		},
		{
			id: "e004",
			date: "2026-03-31T18:00:00.000Z",
			category: "salary",
			description: "Monthly payroll - Logistics Team",
			amount: 125000,
		},
		{
			id: "e005",
			date: "2026-03-28T09:00:00.000Z",
			category: "goods",
			description: "Weekly wholesale purchase",
			amount: 81500,
		},
		{
			id: "e006",
			date: "2026-03-25T14:30:00.000Z",
			category: "other",
			description: "Freight and shipping fees",
			amount: 12000,
		},
		{
			id: "e007",
			date: "2026-03-21T09:00:00.000Z",
			category: "goods",
			description: "Weekly wholesale purchase",
			amount: 74000,
		},
		{
			id: "e008",
			date: "2026-03-15T11:15:00.000Z",
			category: "other",
			description: "Custom branded packaging material",
			amount: 18500,
		},
		{
			id: "e009",
			date: "2026-03-14T09:00:00.000Z",
			category: "goods",
			description: "Weekly wholesale purchase",
			amount: 88000,
		},
		{
			id: "e010",
			date: "2026-03-01T08:00:00.000Z",
			category: "utilities",
			description: "Warehouse monthly rent and electricity",
			amount: 150000,
		},
	];

	createExpense(
		expense: Omit<Expense, "id" | "date"> & { date?: string },
	): Expense {
		if (expense.date && isNaN(Date.parse(expense.date))) {
			throw new HttpError(404, "Invalid Date");
		}
		const newExpense: Expense = {
			...expense,
			date: expense.date ?? new Date().toISOString(),
			id: crypto.randomUUID(),
		};

		this.expenses.push(newExpense);

		return newExpense;
	}

	getByCategoryDateRange(fromDate: string, toDate: string): Expense[] {
		return this.expenses;
	}

	getById(id: string): Expense {
		return this.expenses[1];
	}
}

export const ExpenseSvc: IExpenseService = new Service();
