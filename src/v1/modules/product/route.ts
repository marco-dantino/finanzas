import { Router } from "express";
import { createProductController } from "./controller";
import { ProductSvc } from "./service";

const router = Router();

const productController = createProductController(ProductSvc);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);
router.post("/:id/restock", productController.incrementStock);
router.post("/:id/decrease-stock", productController.decreaseStock);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export { router as productRouter };
