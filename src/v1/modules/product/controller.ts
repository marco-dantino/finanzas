import type { Request, Response } from "express";
import type { IProductService, Product } from "./types";

export function createProductController(svc: IProductService) {
	async function getAllProducts(_: Request, res: Response) {
		const products = svc.getAllProducts();

		if (!products) return res.status(404).json({ message: "No hay productos" });
		return res.status(200).json(products);
	}

	async function getProductById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const product = svc.getProductById(id);

			if (!product) return res.status(404).json({ message: "No hay producto" });

			return res.status(200).json(product);
		} catch (error) {
			console.error("Error al encontrar el item:", error);
			res.status(500).json({ message: "Error interno del servidor" });
		}
	}

	async function createProduct(req: Request, res: Response) {
		try {
			const product: Omit<Product, "id"> = req.body;

			if (
				!product.name ||
				!product.unitPrice ||
				product.stock == null ||
				!product.unit
			)
				return res.status(400).json({ menssage: "Falta campo obligatorio" });

			if (typeof product.name !== "string")
				return res.status(404).json({ menssage: "Nombre incorrecto." });
			if (typeof product.unitPrice !== "number" || product.unitPrice < 0)
				return res.status(404).json({ menssage: "Unit Price incorrecto." });
			if (typeof product.stock !== "number" || product.unitPrice < 0)
				return res.status(404).json({ menssage: "Stock incorrecto." });

			svc.createProduct(product);

			return res.status(201).json({
				products: svc.getAllProducts(),
				menssage: "Producto insertado",
			});
		} catch (error) {
			console.error("Error al encontrar el item:", error);
			res.status(500).json({ message: "Error interno del servidor" });
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
		try {
			const { id } = req.params;
			const deletedProduct = svc.deleteProduct(id);

			if (!deletedProduct)
				return res.status(404).json({ message: "No hay producto" });

			return res
				.status(201)
				.json({ product: deletedProduct, mensaje: "Producto eliminado" });
		} catch (error) {
			console.error("Error al encontrar el item:", error);
			res.status(500).json({ mensaje: "Error interno del servidor" });
		}
	}

	return {
		getAllProducts,
		getProductById,
		createProduct,
		updateProduct,
		deleteProduct,
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
