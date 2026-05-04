import { HttpError, NotFoundHttpError, RequiredError } from "@/v1/res/errors";
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

		if (!findProduct) throw new NotFoundHttpError("Producto");

		return findProduct;
	}

	createProduct(newProduct: Omit<Product, "id">): Product {
		const product: Product = {
			id: crypto.randomUUID(),
			...newProduct,
		};

		if (
			!product.name ||
			!product.stock ||
			!product.unit ||
			!product.unitPrice
		) {
			throw new RequiredError("name");
		}

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
			throw new NotFoundHttpError("Producto");
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

	incrementStock(id: string, quantity: number): Product | undefined {
		const product = this.products.find((product) => product.id === id);

		if (!product) return undefined;

		product.stock += quantity;

		return product;
	}

	decreaseStock(id: string, quantity: number): Product {
		const product = this.products.find((product) => product.id === id);

		if (!product) throw new HttpError(404, "Producto no encontrado");

		if (quantity > product.stock) {
			throw new HttpError(
				400,
				`Stock insuficiente. Stock actual: ${product.stock}, solicitado: ${quantity}`,
			);
		}
		product.stock -= quantity;

		return product;
	}

	deleteProduct(id: string): Product {
		///const deletedProduct = this.products.find((product) => product.id === id);
		///this.products.filter((product) => product.id !== id);
		const index = this.products.findIndex((product) => product.id === id);

		if (index === -1) {
			throw new NotFoundHttpError("Producto");
		}

		const [deleteProduct] = this.products.splice(index, 1);

		return deleteProduct;
	}

	lowStock(limit: number): Product[] {
		if (!this.products) {
			throw new NotFoundHttpError("Producto");
		}

		// const findProducts = this.products.filter(
		// 	(product) => product.stock < limit,
		// );

		return this.products.filter((product) => product.stock < limit);
	}
}

export const ProductSvc: IProductService = new Service();
