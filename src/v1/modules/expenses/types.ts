export type ExpenseCategory = "goods" | "salary" | "utilities" | "other";

export interface Expense {
	id: string;
	date: string; // ISO date
	category: ExpenseCategory;
	description: string;
	amount: number;
}

export interface IExpenseService {
	createExpense(expense: Omit<Expense, "id" | "date">): Expense;
	getById(id: string): Expense;
	getByCategoryDateRange(fromDate: string, toDate: string): Expense[];
}
