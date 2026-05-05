interface SaleItem {
	productId: string;
	quantity: number;
	unitPrice: number; //precio a momento de venta
}

export interface Sale {
	id: string;
	date: string;
	items: SaleItem[];
}

export type SaleResponse = Sale & { total: number };

export interface ISaleService {
	getAllSales(): Sale[];
	createSale(sale: Omit<Sale, "id" | "date">): SaleResponse;
	getSalesByDateRange(fromDate: string, toDate: string): string[];
}
