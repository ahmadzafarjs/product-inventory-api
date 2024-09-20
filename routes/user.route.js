import { Router } from "express";
import { generateApiKey, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/authRequest.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/generate-api-key").put(verifyUser ,generateApiKey)

export default router;