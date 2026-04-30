import type { ErrorRequestHandler, RequestHandler, Router } from "express";
import express from "express";
import { v1ErrorHandler } from "@/v1/res/error-handler";
import { v1Router } from "@/v1/route";

// const products: Product[] = [
// 	{
// 		id: "1",
// 		name: "Manzana",
// 		unitPrice: 850,
// 		stock: 20,
// 		unit: "kg",
// 	},
// 	{
// 		id: "2",
// 		name: "Naranja",
// 		unitPrice: 630,
// 		stock: 50,
// 		unit: "kg",
// 	},
// ];

export type Version = "1";
export type ApiPath = `/api/v${Version}`;

function mountVersion(
	app: Router,
	path: ApiPath,
	router: RequestHandler,
	errorHandler: ErrorRequestHandler,
) {
	app.use(path, router);
	app.use(path, errorHandler);
}

const api = express();

api.use(express.json());

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

// api.post("/product", (req: Request, res: Response) => {
// 	try {
// 		const { name, unitPrice, stock, unit } = req.body;
// 		if (!name || !unitPrice || stock == null || !unit)
// 			return res.status(400).json({ menssage: "Falta campo obligatorio" });

// 		if (typeof name !== "string")
// 			return res.status(404).json({ menssage: "Nombre incorrecto." });
// 		if (typeof unitPrice !== "number" || unitPrice < 0)
// 			return res.status(404).json({ menssage: "Unit Price incorrecto." });
// 		if (typeof stock !== "number" || unitPrice < 0)
// 			return res.status(404).json({ menssage: "Stock incorrecto." });

// 		const newProduct = {
// 			id: crypto.randomUUID(),
// 			name,
// 			unitPrice,
// 			stock,
// 			unit,
// 		};

// 		products.push(newProduct);

// 		res.status(201).json({ ...products, menssage: "Producto insertado" });
// 	} catch (error) {
// 		console.error("Error al crear item:", error);
// 		res.status(500).json({ mensaje: "Error interno del servidor" });
// 	}
// });

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

api.use(express.urlencoded({ extended: true }));

mountVersion(api, "/api/v1", v1Router, v1ErrorHandler);

export { api };
