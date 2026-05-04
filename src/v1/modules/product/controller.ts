import type { Request, Response } from "express";
import { HttpError, NotFoundHttpError, RequiredError } from "@/v1/res/errors";
import type { IProductService, Product } from "./types";

export function createProductController(svc: IProductService) {
	async function getAllProducts(_: Request, res: Response) {
		const products = svc.getAllProducts();

		return res.status(200).json(products);
	}

	async function lowStock(req: Request, res: Response) {
		const limitParam = req.query.limit;
		const limit = limitParam ? Number(limitParam) : 5;

		const products = svc.lowStock(limit);

		return res.status(200).json(products);
	}

	async function getProductById(req: Request, res: Response) {
		const { id } = req.params;
		const product = svc.getProductById(id);

		return res.status(200).json(product);
	}

	async function createProduct(req: Request, res: Response) {
		const product: Omit<Product, "id"> = req.body;

		svc.createProduct(product);

		return res.status(201).json({
			products: svc.getAllProducts(),
			message: "Producto insertado",
		});
	}

	async function updateProduct(req: Request, res: Response) {
		const { id } = req.params; //destruc //lo mismo es //const id = req.params.id;
		const updatedFields: Partial<Product> = req.body;

		svc.updateProduct(id, updatedFields);

		return res.json({
			mensaje: "Producto actualizado",
			producto: updateProduct,
			products: svc.getAllProducts(),
		});
	}

	async function deleteProduct(req: Request, res: Response) {
		const { id } = req.params;
		const deletedProduct = svc.deleteProduct(id);

		return res
			.status(201)
			.json({ product: deletedProduct, mensaje: "Producto eliminado" });
	}

	async function incrementStock(req: Request, res: Response) {
		const { id } = req.params;
		const { quantity } = req.body;

		const incrementedProduct = svc.incrementStock(id, quantity);

		return res.status(201).json({
			product: {
				id: incrementedProduct.id,
				name: incrementedProduct.name,
				stock: incrementedProduct.stock,
			},
			message: "Incrementado el Product",
		});
	}

	async function decreaseStock(req: Request, res: Response) {
		const { id } = req.params;
		const { quantity } = req.body;

		const decrementedProduct = svc.decreaseStock(id, quantity);

		return res.status(201).json({
			product: {
				id: decrementedProduct.id,
				name: decrementedProduct.name,
				stock: decrementedProduct.stock,
			},
			message: "Incrementado el Product",
		});
	}

	return {
		getAllProducts,
		getProductById,
		createProduct,
		updateProduct,
		deleteProduct,

		incrementStock,
		decreaseStock,
		lowStock,
	};
}
