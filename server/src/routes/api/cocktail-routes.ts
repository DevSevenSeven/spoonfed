import express from "express";
import CoctailController from "../../controllers/cocktail-controller.js";

const router = express.Router();

// get recipes
router.get("/searchCocktailPairings", CoctailController.searchCocktailPairings);

export { router as cocktailRouter };
