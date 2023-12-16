import { cache } from "react";
import { RecipeAnalyzedInstruction, RecipeIngredients, Recipes, RecipeSummary } from "../types/recipe";
import { buildQueryParams, getHeaders } from "../utils/helpers";

const baseUrl = 'https://api.spoonacular.com';
const PAGE_SIZE = 20;


export const getRecipes = cache(async (query = "", page = 1): Promise<Recipes> => {
    const headers = getHeaders();

    const params: { [key: string]: string } = {};
    if (query) params.query = query;
    params.offset = ((page - 1) * PAGE_SIZE).toString();
    params.number = PAGE_SIZE.toString();

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
    async (recipeId: number): Promise<RecipeSummary> => {
        if (!recipeId) {
            throw new Error("Recipe ID is required.");
        }

        const headers = getHeaders();

        const res = await fetch(`${baseUrl}/recipes/${recipeId}/information`, {
            headers,
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data for recipe ID ${recipeId}.`);
        }

        return res.json();
    }
);



export const getRecipeIngredients = cache(
    async (recipeId: number): Promise<RecipeIngredients> => {
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
    async (recipeId: number): Promise<RecipeAnalyzedInstruction[]> => {
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