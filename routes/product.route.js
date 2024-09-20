import Router from "express";
import { verifyApiKey, verifyUser } from "../middlewares/authRequest.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.use(verifyUser, verifyApiKey)

router.route("/" ).get( getAllProducts).post( createProduct)

router.route("/:id").put(updateProduct).delete(deleteProduct)


export default router;