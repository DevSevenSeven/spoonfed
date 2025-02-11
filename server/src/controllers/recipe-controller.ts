import { Request, Response } from "express";
import axios from "axios";

class RecipeController {
  baseUrlElse = "https://api.spoonacular.com";

  async findByIngredients(req: Request, res: Response) {
    console.log("@findByIngredients...");
    const baseUrl = process.env.SPOONACULAR_API_BASE_URL || this.baseUrlElse;
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!baseUrl || !apiKey) {
      console.log(
        `@findByIngredients - Missing API configuration BaseURL: ${baseUrl}, apiKey: ${apiKey}`
      );
      return res.status(500).json({ error: "Missing API configuration" });
    }

    const { ingredients, number } = req.query;

    const ingredientValues = Array.isArray(ingredients)
      ? ingredients.join(",")
      : ingredients?.toString() || "";

    if (!ingredientValues) {
      console.log(
        `@findByIngredients - Ingredients query parameter is required ${ingredientValues}`
      );
      return res
        .status(400)
        .json({ error: "Ingredients query parameter is required" });
    }

    try {
      const response = await fetch(
        `${baseUrl}/recipes/findByIngredients?ingredients=${encodeURIComponent(
          ingredientValues
        )}&number=${number || 10}&apiKey=${apiKey}`
      );

      if (!response.ok) {
        console.log(
          `@findByIngredients - response from spoonacular failed ${response.status}`
        );

        return res
          .status(response.status)
          .json({ error: "Failed to fetch recipes for the given ingredients" });
      }

      const data = await response.json();
      console.log(`@findByIngredients - returning successful response...`);
      console.log(data);
      return res.json(data); // Send the response back to the client
    } catch (error) {
      console.log(
        `@findByIngredients -Error fetching recipes by ingredients: ${error}`
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getRecipeInformation(req: Request, res: Response) {
    const baseUrl = process.env.SPOONACULAR_API_BASE_URL || this.baseUrlElse;
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!baseUrl || !apiKey) {
      console.log(
        `@getRecipeInformation - Missing API configuration BaseURL: ${baseUrl}, apiKey: ${apiKey}`
      );
      return res.status(500).json({ error: "Missing API configuration" });
    }

    const { recipeId } = req.params;

    if (!recipeId) {
      console.log(`@getRecipeInformation - Recipe ID is required`);
      return res.status(400).json({ error: "Recipe ID is required" });
    }

    try {
      const response = await fetch(
        `${baseUrl}/recipes/${recipeId}/information?apiKey=${apiKey}`
      );

      if (!response.ok) {
        console.log(
          `@getRecipeInformation - request to spoonacular api failed ${response.status} ${response.statusText}`
        );

        return res
          .status(response.status)
          .json({ error: "Failed to fetch recipe information" });
      }

      const data = await response.json();
      console.log(
        `@getRecipeInformation - sending successful response back to the client`
      );
      return res.json(data);
    } catch (error) {
      console.log(
        `@getRecipeInformation - Error fetching recipe information ${error}`
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new RecipeController();
