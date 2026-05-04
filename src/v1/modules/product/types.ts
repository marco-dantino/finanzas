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
	createProduct(product: Omit<T, "id">): Product;
	updateProduct(
		id: string,
		updateFields: Partial<Product>,
	): Product | undefined;
	deleteProduct(id: string): Product;
	incrementStock(id: string, quantity: number): Product | undefined;
	decreaseStock(id: string, quantity: number): Product;
	lowStock(limit: number): Product[];
}
