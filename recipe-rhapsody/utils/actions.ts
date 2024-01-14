"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { Recipe } from "../types/recipe";
import { getRecipeSummary } from "../lib/spoonacular";

interface AddRecipeResponse {
  success: boolean;
  error?: string;
}

export async function addRecipe(recipe: Recipe): Promise<AddRecipeResponse> {
  const supabase = createServerActionClient({ cookies });

  // get current user session
  const { data: { session } } = await supabase.auth.getSession();

  try {
    // Check if the user is authenticated
    if (!session) {
      throw new Error('You have to be logged in to add a recipe');
    }

    // insert the data
    const { error } = await supabase.from('recipes')
      .insert({
        recipe_id: recipe.id, user_email: session?.user.email
      });

    if (error) {
      throw new Error('Could not add the new recipe.');
    }

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getMyRecipes(userEmail: string) {
  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase
    .from("recipes")
    .select()
    .eq("user_email", userEmail); // Filter recipes by user email

  if (error) {
    console.error(error.message);
    return [];
  }

  const recipes = await Promise.all(
    data.map(async (savedRecipe: any) => {
      try {
        // get details from Spoonacular based on recipe id in Supabase
        const details = await getRecipeSummary(savedRecipe.recipe_id);

        // merge saved recipe data with Spoonacular details
        return { ...savedRecipe, ...details };
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null;
      }
    })
  );

  // Filter out any recipes with errors
  return recipes.filter((recipe: Recipe) => recipe !== null);
};




export type GetSavedRecipeIdsResponse = {
  success: boolean;
  data?: number[];
  error?: string;
};

export async function getSavedRecipeIds(): Promise<GetSavedRecipeIdsResponse> {
  const supabase = createServerActionClient({ cookies });

  // get current user session
  const { data: { session } } = await supabase.auth.getSession();

  try {
    // fetch saved recipe IDs for the current user
    const { data, error } = await supabase
      .from('recipes')
      .select('recipe_id')
      .eq('user_email', session?.user.email);

    if (error) {
      throw new Error('Failed to fetch saved recipe IDs.');
    }

    // Extract recipe IDs from the data
    const recipeIds = data?.map((item) => item.recipe_id) || [];

    return { success: true, data: recipeIds };
  } catch (error) {
    return { success: false, error: 'Internal Server Error' };
  }
}



// Function to add a recipe to the shopping list
export async function addToShoppingList(recipe: Recipe): Promise<AddRecipeResponse> {

  const supabase = createServerActionClient({ cookies });

  // Get the current user session
  const { data: { session } } = await supabase.auth.getSession();

  try {
    // Map through extendedIngredients and create an array of ingredients
    const ingredientsArray = recipe.extendedIngredients.map((ingredient) => ({
      name: ingredient.name,
    }));


    // Insert the recipe into the shopping_list table
    const { error } = await supabase.from("shopping_list").insert([
      {
        user_email: session?.user.email,
        recipe_id: recipe.id,
        ingredients: ingredientsArray,
      },
    ]);



    // Check for errors and throw an exception if there is one
    if (error) {
      throw new Error('Could not add ingredients.');
    }

    // Return success if there are no errors
    return { success: true };
  } catch (error) {
    // Return an error response if there's an exception
    return { success: false, error: 'Internal Server Error' };
  }
}

export async function getMyShoppingList(userEmail: string) {
  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase
    .from("shopping_list")
    .select()
    .eq("user_email", userEmail); // Filter recipes by user email

  if (error) {
    console.error(error.message);
    return [];
  }

  const ingredients = await Promise.all(
    data.map(async (savedRecipe: any) => {
      try {
        // get details from Spoonacular based on recipe id in Supabase
        const details = await getRecipeSummary(savedRecipe.recipe_id);

        // merge saved recipe data with Spoonacular details
        return { ...savedRecipe, ...details };
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null;
      }
    })
  );

  // Filter out any recipes with errors
  return ingredients.filter((recipe: Recipe) => recipe !== null);


}

