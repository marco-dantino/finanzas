import type { Request, Response } from "express";
import { HttpError, NotFoundHttpError, RequiredError } from "@/v1/res/errors";
import type { IProductService, Product } from "./types";

export function createProductController(svc: IProductService) {
	async function getAllProducts(_: Request, res: Response) {
		const products = svc.getAllProducts();

		if (!products) return res.status(404).json({ message: "No hay productos" });
		return res.status(200).json(products);
	}

	async function lowStock(req: Request, res: Response) {
		const limitParam = req.query.limit;
		const limit = limitParam ? Number(limitParam) : 5;

		console.log("Param", limitParam);
		console.log(limit);

		const products = svc.lowStock(limit);

		return res.status(200).json(products);
	}

	async function getProductById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const product = svc.getProductById(id);

			return res.status(200).json(product);
		} catch (error) {
			if (error instanceof NotFoundHttpError)
				res.status(error.statusCode).json({ message: error.message });
		}
	}

	async function createProduct(req: Request, res: Response) {
		try {
			const product: Omit<Product, "id"> = req.body;

			svc.createProduct(product);

			return res.status(201).json({
				products: svc.getAllProducts(),
				message: "Producto insertado",
			});
		} catch (error) {
			console.error("Error al encontrar el item:", error);
			if (error instanceof RequiredError) {
				res.status(400).json({ message: error.message });
			}
		}
	}

	async function updateProduct(req: Request, res: Response) {
		try {
			const { id } = req.params; //destruc //lo mismo es //const id = req.params.id;
			const updatedFields: Partial<Product> = req.body;

			const updatedProduct = svc.updateProduct(id, updatedFields);

			if (!updatedProduct)
				return res.status(404).json({ menssage: "No hay niguna modificacion" });

			return res.json({
				mensaje: "Producto actualizado",
				producto: updateProduct,
				products: svc.getAllProducts(),
			});
		} catch (error) {
			console.error("Error al encontrar el item:", error);
			res.status(500).json({ mensaje: "Error interno del servidor" });
		}
	}

	async function deleteProduct(req: Request, res: Response) {
		const { id } = req.params;
		const deletedProduct = svc.deleteProduct(id);

		return res
			.status(201)
			.json({ product: deletedProduct, mensaje: "Producto eliminado" });
	}

	async function incrementStock(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { quantity } = req.body;

			const incrementedProduct = svc.incrementStock(id, quantity);

			if (!incrementedProduct)
				return res.status(404).json({ message: "Error del obj" });
			if (incrementedProduct.stock < 0)
				return res
					.status(404)
					.json({ message: "La cantidad debe ser superior a 0" });

			return res.status(201).json({
				product: {
					id: incrementedProduct.id,
					name: incrementedProduct.name,
					stock: incrementedProduct.stock,
				},
				message: "Incrementado el Product",
			});
		} catch (error) {
			console.error("Error al encontrar el item:", error);
			res.status(500).json({ message: "Error interno del servidor" });
		}
	}

	async function decreaseStock(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { quantity } = req.body;

			const incrementedProduct = svc.decreaseStock(id, quantity);

			return res.status(201).json({
				product: {
					id: incrementedProduct.id,
					name: incrementedProduct.name,
					stock: incrementedProduct.stock,
				},
				message: "Incrementado el Product",
			});
		} catch (error) {
			console.error("Error al encontrar el item:", error);
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			}
		}
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

// api.put("/products/:id", (req: Request, res: Response) => {
// 	try {
// 		const { id } = req.params; //destruc //lo mismo es //const id = req.params.id;
// 		const { unitPrice, stock } = req.body;
// 		if (!products)
// 			return res.status(404).json({ menssage: "No hay productos" });

// 		const findProduct = products.find((product) => product.id === id);
// 		if (!findProduct)
// 			return res.status(404).json({ menssage: "ID incorrecto" });

// 		const newProduct: Product = {
// 			...findProduct,
// 			unitPrice: unitPrice,
// 			stock: stock,
// 		};

// 		const prod = products.map((prd) => {
// 			return prd.id === id ? newProduct : prd;
// 		});

// 		return res.json({
// 			mensaje: "Producto actualizado",
// 			producto: newProduct,
// 			products: prod,
// 		});
// 	} catch (error) {
// 		console.error("Error al encontrar el item:", error);
// 		res.status(500).json({ mensaje: "Error interno del servidor" });
// 	}
// });
