import { Router } from "express";
import { userRouter } from "./user-routes.js";
import { recipeRouter } from "./recipe-routes.js";
import { cocktailRouter } from "./cocktail-routes.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = Router();

router.use("/users", userRouter);
router.use("/recipes", authenticateToken, recipeRouter);
router.use("/cocktail", authenticateToken, cocktailRouter);

export default router;
