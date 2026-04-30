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

	getProductById(id: string): Product | undefined {
		const findProduct = this.products.find((product) => product.id === id);
		return findProduct;
	}
}
export const ProductSvc: IProductService = new Service();
