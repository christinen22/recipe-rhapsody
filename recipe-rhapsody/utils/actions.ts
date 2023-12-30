"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { Recipe } from "../types/recipe";

interface AddRecipeResponse {
  success: boolean;
  error?: string;
}


export async function addRecipe(recipe: Recipe): Promise<AddRecipeResponse> {

  const supabase = createServerActionClient({ cookies });


  // get current user session
  const { data: { session } } = await supabase.auth.getSession();

  try {
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

    console.log(ingredientsArray)

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


/* export async function deleterecipe(id) {
  const supabase = createServerActionClient({ cookies })

  const { error } = await supabase.from('recipes')
    .delete()
    .eq('id', id)
  
  if (error) {
    throw new Error('Could not delete the recipe.')
  }

  revalidatePath('/recipes')
  redirect('/recipes')
}  */