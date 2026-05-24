import type { Request, Response } from "express";
import type { SuccessResponse } from "@/v1/types";
import type { ISaleService } from "./types";

export function createSaleController(svc: ISaleService) {
	async function createSale(req: Request, res: Response) {
		const { items } = req.body;

		if (!items || !Array.isArray(items)) {
			return res
				.status(400)
				.json({ error: "Items is required and must be an array" });
		}

		for (const item of items) {
			if (typeof item.productId !== "string") {
				return res.status(400).json({ error: "productId must be a string" });
			}
			if (typeof item.quantity !== "number") {
				return res.status(400).json({ error: "quantity must be a number" });
			}
		}

		const sale = svc.createSale(req.body);

		const response: SuccessResponse = {
			data: sale,
			message: "Venta creada",
			success: true,
		};

		return res.status(201).json(response);
	}

	async function getSalesByDateRange(req: Request, res: Response) {
		const { from, to } = req.query;
		console.log("FECHAS DEL QUERY", from, to);

		const findDates = svc.getSalesByDateRange(String(from), String(to));

		const response: SuccessResponse = {
			data: findDates,
			message: "Venta encontrada por rango de Fecha",
			success: true,
		};
		return res.status(200).json(response);
	}

	async function getById(req: Request, res: Response) {
		const { id } = req.params;

		const findSale = svc.getById(id);
		const response: SuccessResponse = {
			data: findSale,
			message: "Venta encontrada",
			success: true,
		};

		return res.status(200).json(response);
	}

	return {
		createSale,
		getSalesByDateRange,
		getById,
	};
}
