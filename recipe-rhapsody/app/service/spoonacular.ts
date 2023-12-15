import { cache } from "react";
import { RecipeAnalyzedInstruction, RecipeIngredients, Recipes, RecipeSummary } from "../types/recipe";
import { buildQueryParams, getHeaders } from "../utils/helpers";

const baseUrl = 'https://api.spoonacular.com';

export const getRecipes = cache(async (query = ""): Promise<Recipes> => {
    const headers = getHeaders();

    const params: { [key: string]: string } = {};
    if (query) params.query = query;
    const queryParams = buildQueryParams(params);

    const res = await fetch(`${baseUrl}/recipes/complexSearch${queryParams}`, {
        headers
    });

    if (!res.ok) {

        throw new Error("Failed to fetch data");
    }

    return res.json();
});

export const getRecipeSummary = cache(
    async (recipeId = ""): Promise<RecipeSummary> => {
        const headers = getHeaders();

        const res = await fetch(`${baseUrl}/recipes/${recipeId}/summary`, {
            headers
        });

        if (!res.ok) {

            throw new Error("Failed to fetch data");
        }

        return res.json();
    }
);

export const getRecipeIngredients = cache(
    async (recipeId = ""): Promise<RecipeIngredients> => {
        const headers = getHeaders();

        const res = await fetch(`${baseUrl}/recipes/${recipeId}/ingredientWidget.json`, {
            headers
        });

        if (!res.ok) {

            throw new Error("Failed to fetch data");
        }

        return res.json();
    }
);


export const getRecipeInstructions = cache(
    async (recipeId = ""): Promise<RecipeAnalyzedInstruction[]> => {
        const headers = getHeaders();

        const res = await fetch(`${baseUrl}/recipes/${recipeId}/analyzedInstructions`, {
            headers
        });

        if (!res.ok) {

            throw new Error("Failed to fetch data");
        }

        return res.json();
    }
);