export interface Product {
	id: string;
	name: string;
	unitPrice: number;
	stock: number;
	unit: "kg" | "unit" | "bunch";
}

export interface IProductService {
	getAllProducts(): Product[];
	getProductById(id: string): Product | undefined;
	createProduct(product: Product): Product;
	updateProduct(
		id: string,
		updateFields: Partial<Product>,
	): Product | undefined;
}
