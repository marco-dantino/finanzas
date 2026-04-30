import type { SaleItem } from "@/entities/SaleItem";

interface Sale {
	id: string;
	date: string;
	items: SaleItem[];
}
