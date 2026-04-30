import { Router } from "express";
import { auth } from "@/v1/middlewares/auth";
import { healthcheckRouter } from "@/v1/modules/healthcheck/route";
import { productRouter } from "./modules/product/route";

const root = Router();

root.use("/healthcheck", healthcheckRouter);
root.use("/products", productRouter);

export { root as v1Router };
