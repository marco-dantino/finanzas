import { Router } from "express";
import { createSaleController } from "./controller";
import { SaleSvc } from "./service";

const router = Router();

const saleController = createSaleController(SaleSvc);

router.get("/", saleController.getSalesByDateRange);
// router.get("/", saleController.getAllSales);
router.post("/", saleController.createSale);

export { router as saleRouter };
