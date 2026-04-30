import { ExpenseCategory } from "@/types/expense";

interface Expense {
	id: string;
	date: string;
	category: ExpenseCategory;
	description: string;
	amount: number;
}
