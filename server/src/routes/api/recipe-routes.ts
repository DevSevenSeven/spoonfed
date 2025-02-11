import express from "express";
import RecipeController from "../../controllers/recipe-controller.js";

const router = express.Router();

// get recipes
router.get("/findByIngredients", RecipeController.findByIngredients);

router.get("/:recipeId/information", RecipeController.getRecipeInformation);

export { router as recipeRouter };
