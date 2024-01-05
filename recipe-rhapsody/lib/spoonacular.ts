import { cache } from "react";
import { RecipeIngredients, Recipes, RecipeSummary, Recipe, RandomRecipe, IngredientSearch } from '../types/recipe'

import { buildQueryParams, getHeaders } from "../utils/helpers";

const baseUrl = 'https://api.spoonacular.com';
const PAGE_SIZE = 20;



export const getRecipes = cache(
    async (
        query?: string,
        page = 1,
        dietaryPreferences: string[] = [],
        mealType?: string,
        cuisine?: string
    ): Promise<Recipes> => {
        const headers = getHeaders();

        const params: { [key: string]: string } = {};
        if (query) params.query = query;
        params.offset = ((page - 1) * PAGE_SIZE).toString();
        params.number = PAGE_SIZE.toString();

        if (dietaryPreferences.length > 0) {
            params.diet = dietaryPreferences.join(",");
        }

        // additional parameters with helper buildQueryParams
        const queryParams = buildQueryParams(params, { mealType, cuisine });

        const res = await fetch(
            `${baseUrl}/recipes/complexSearch${queryParams}`,
            {
                headers,
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        return {
            ...data,
            results: data.results.slice(0, PAGE_SIZE),
        };
    }
);

export const getPopularDesserts = async (): Promise<Recipes> => {
    try {
        const headers = getHeaders()
        const res = await fetch(`${baseUrl}/recipes/complexSearch?query=desserts&sort=popularity`, { headers });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching random recipes:", error);
        throw error;
    }
}




export const getRandomRecipes = async (): Promise<RandomRecipe> => {
    try {
        const headers = getHeaders();
        const res = await fetch(`${baseUrl}/recipes/random`, { headers });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching random recipes:", error);
        throw error;
    }
};




export const getRecipesByIngredients = async (ingredients: string, dietaryPreferences: string[] = [],): Promise<IngredientSearch[]> => {
    try {
        const headers = getHeaders();
        const apiUrl = `${baseUrl}/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}`;

        console.log('API URL:', apiUrl);  // Add this line

        const response = await fetch(apiUrl, { headers });

        if (!response.ok) {
            throw new Error(`Failed to fetch recipes by ingredients. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching recipes by ingredients:", error);
        throw error;
    }
};





export const getRecipeSummary = cache(
    async (recipeId: number): Promise<Recipe> => {
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

/* 

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
); */