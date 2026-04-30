import type { Request, Response } from "express";
import type { IProductService } from "./types";

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

	return {
		getAllProducts,
		getProductById,
	};
}

// api.get("/products/:id", (req: Request, res: Response) => {
// 	try {
// 		const { id } = req.params; //destruc //lo mismo es //const id = req.params.id;

// 		const findProduct = products.find((product) => product.id === id);

// 		if (!products)
// 			return res.status(404).json({ menssage: "No hay productos" });
// 		return res.json(findProduct);
// 	} catch (error) {
// 		console.error("Error al encontrar el item:", error);
// 		res.status(500).json({ mensaje: "Error interno del servidor" });
// 	}
// });

// api.get("/products", (_, res) => {
//     if (!products) return res.status(404).json({ menssage: "No hay productos" });
//     return res.json(products);
// });
