import { HttpError, NotFoundHttpError } from "@/v1/res/errors";
import { ProductSvc as svcProduct } from "../product/service";
import type { ISaleService, Sale } from "./types";

class Service implements ISaleService {
	private sales = [
		{
			id: "s010",
			date: "2026-04-18T14:32:00.000Z",
			items: [
				{ productId: "a1b2c3", quantity: 2, unitPrice: 850 },
				{ productId: "d4e5f6", quantity: 3, unitPrice: 600 },
			],
			total: 3500,
		},
		{
			id: "s011",
			date: "2026-04-20T10:15:00.000Z",
			items: [
				{ productId: "x7y8z9", quantity: 1, unitPrice: 1200 },
				{ productId: "a1b2c3", quantity: 4, unitPrice: 850 },
			],
			total: 4600,
		},
		{
			id: "s012",
			date: "2026-04-25T18:45:00.000Z",
			items: [{ productId: "d4e5f6", quantity: 5, unitPrice: 600 }],
			total: 3000,
		},
		{
			id: "s013",
			date: "2026-04-28T09:00:00.000Z",
			items: [
				{ productId: "m1n2o3", quantity: 2, unitPrice: 1500 },
				{ productId: "x7y8z9", quantity: 1, unitPrice: 1200 },
			],
			total: 4200,
		},
		{
			id: "s014",
			date: "2026-05-01T12:20:00.000Z",
			items: [
				{ productId: "a1b2c3", quantity: 3, unitPrice: 850 },
				{ productId: "p4q5r6", quantity: 2, unitPrice: 950 },
			],
			total: 4630,
		},
	];

	createSale(newSale: Omit<Sale, "id" | "date">): Sale {
		const items = newSale.items.map((item) => {
			const product = svcProduct.decreaseStock(item.productId, item.quantity);
			return { ...item, unitPrice: product.unitPrice };
		});

		const sale: Sale = {
			id: crypto.randomUUID(),
			date: new Date().toISOString(),
			items,
			total: items.reduce(
				(acc, item) => acc + item.quantity * item.unitPrice,
				0,
			),
		};

		this.sales.push(sale);

		return sale;
	}

	getSalesByDateRange(fromDate: string, toDate: string): Sale[] {
		const from = new Date(fromDate);
		const to = new Date(toDate);

		const nuevo = this.sales.filter((sale) => {
			const dateSale = new Date(sale.date);
			return dateSale >= from && dateSale <= to;
		});

		console.log(nuevo);
		return nuevo;
	}

	getById(id: string): Sale {
		const findSale = this.sales.find((sale) => sale.id === id);

		if (!findSale) {
			throw new NotFoundHttpError("Producto");
		}

		return findSale;
	}
}

export const SaleSvc: ISaleService = new Service();
