import type { Request, Response } from "express";
import type { ISaleService, Sale } from "./type";

export function createSaleController(svc: ISaleService) {
	// async function getAllSales(_: Request, res: Response) {
	// 	const sales = svc.getAllSales();

	// 	return res.status(200).json(sales);
	// }

	async function createSale(req: Request, res: Response) {
		const sales: Omit<Sale, "id" | "date"> = req.body;

		const sale = svc.createSale(sales);

		return res.status(201).json(sale);
	}

	async function getSalesByDateRange(req: Request, res: Response) {
		const { from, to } = req.query;
		console.log("FECHAS DEL QUERY", from, to);

		const findDates = svc.getSalesByDateRange(from, to);
		return res.status(200).json(findDates);
	}

	return {
		createSale,
		// getAllSales,
		getSalesByDateRange,
	};
}
