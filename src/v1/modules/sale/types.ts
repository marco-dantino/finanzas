interface SaleItem {
	productId: string;
	quantity: number;
	unitPrice: number; //precio a momento de venta
}

export interface Sale {
	id: string;
	date: string;
	items: SaleItem[];
	total: number;
}

export interface ISaleService {
	createSale(sale: Omit<Sale, "id" | "date">): Sale;
	getSalesByDateRange(fromDate: string, toDate: string): Sale[];
	getById(id: string): Sale;
}
