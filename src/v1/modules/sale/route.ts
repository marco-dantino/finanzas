import { Router } from "express";
import { createSaleController } from "./controller";
import { SaleSvc } from "./service";

const router = Router();

const saleController = createSaleController(SaleSvc);

router.get("/", saleController.getSalesByDateRange);
router.post("/", saleController.createSale);
router.get("/:id", saleController.getById);

export { router as saleRouter };
