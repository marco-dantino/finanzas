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

	createProduct(newProduct: Omit<Product, "id">): Product {
		const product: Product = {
			id: crypto.randomUUID(),
			...newProduct,
		};

		this.products.push(product);
		return product;
	}

	updateProduct(
		id: string,
		updateFields: Partial<Product>,
	): Product | undefined {
		const productIndex = this.products.findIndex(
			(product) => product.id === id,
		);

		if (productIndex === -1) {
			return undefined;
		}

		const updatedProduct: Product = {
			...this.products[productIndex],
			...updateFields,
		};

		this.products[productIndex] = updatedProduct;

		return updatedProduct;
	}

	//vieja forma
	// 	updateProduct(
	// 	id: string,
	// 	updateFields: Partial<Product>,
	// ): Product | undefined {
	// 	const productIndex = this.products.find((product) => product.id === id);

	// 	if (!productIndex) {
	// 		return undefined;
	// 	}

	// 	const updatedProduct: Product = {
	// 		...productIndex,
	// 		...updateFields,
	// 	};

	// this.products = this.products.map((prd) => {
	// 	return prd.id === id ? updatedProduct : prd;
	// });

	// 	return updatedProduct;
	// }

	deleteProduct(id: string): Product | undefined {
		///const deletedProduct = this.products.find((product) => product.id === id);
		///this.products.filter((product) => product.id !== id);
		const index = this.products.findIndex((product) => product.id === id);

		if (index === -1) {
			return undefined;
		}

		const [deleteProduct] = this.products.splice(index, 1);

		return deleteProduct;
	}
}

export const ProductSvc: IProductService = new Service();
