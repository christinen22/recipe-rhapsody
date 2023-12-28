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