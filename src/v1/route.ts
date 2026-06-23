import { Router } from "express";
import { auth } from "@/v1/middlewares/auth";
import { healthcheckRouter } from "@/v1/modules/healthcheck/route";
import { expenseRouter } from "./modules/expenses/route";
import { productRouter } from "./modules/product/route";
import { saleRouter } from "./modules/sale/route";

const root = Router();

root.use("/healthcheck", healthcheckRouter);
root.use("/products", productRouter);
root.use("/sales", saleRouter);
root.use("/expense", expenseRouter);

export { root as v1Router };
