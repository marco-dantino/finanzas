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

	createProduct(newProduct: Product): Product {
		this.products.push(newProduct);
		return newProduct;
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
}

export const ProductSvc: IProductService = new Service();
