import { Request, Response } from "express";
import axios from "axios";

class CocktailController {
  baseUrlElse = "https://the-cocktail-db.p.rapidapi.com";

  async searchCocktailPairings(req: Request, res: Response) {
    console.log(`@searchCocktailPairings`);

    const baseUrl = process.env.COCKTAIL_API_BASE_URL || this.baseUrlElse;
    const apiKey = process.env.COCKTAIL_API_KEY;

    if (!baseUrl || !apiKey) {
      console.log(
        `@searchCocktailPairings - Missing API configuration BaseURL: ${baseUrl}, apiKey: ${apiKey}`
      );
      return res.status(500).json({ error: "Missing API configuration" });
    }

    try {
      const response = await fetch(`${baseUrl}/filter.php?c=Cocktail`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${apiKey}`,
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(
          `@searchCocktailPairings - request to api failed ${response.status} ${response.statusText}`
        );

        return res
          .status(response.status)
          .json({ error: "Failed to fetch cocktail information" });
      }

      const data = await response.json();
      console.log(
        `@searchCocktailPairings - sending successful response back to the client`
      );
      return res.json(data);
    } catch (error) {
      console.log(
        `@searchCocktailPairings - Error fetching coctail information ${error}`
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new CocktailController();
