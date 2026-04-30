import type { IProductService, Product } from "./types";

class Service implements IProductService {
	private products: Product[] = [
		{
			id: "1",
			name: "Manzana",
			unitPrice: 850,
			stock: 20,
			unit: "kg",
		},
		{
			id: "2",
			name: "Naranja",
			unitPrice: 630,
			stock: 50,
			unit: "kg",
		},
	];

	getAllProducts(): Product[] {
		return this.products;
	}
}

export const ProductSvc: IProductService = new Service();
