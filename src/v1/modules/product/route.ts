import { Router } from "express";
import { createProductController } from "./controller";
import { ProductSvc } from "./service";

const router = Router();

const productController = createProductController(ProductSvc);

router.get("/", productController.getAllProducts);

export default router;

export { router as productRouter };
