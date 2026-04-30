import type { Request, Response } from "express";
import type { IProductService } from "./types";

export function createProductController(svc: IProductService) {
	async function getAllProducts(_: Request, res: Response) {
		const products = svc.getAllProducts();

		if (!products)
			return res.status(404).json({ menssage: "No hay productos" });
		return res.json(products);
	}

	return {
		getAllProducts,
	};
}

// api.get("/products", (_, res) => {
//     if (!products) return res.status(404).json({ menssage: "No hay productos" });
//     return res.json(products);
// });
