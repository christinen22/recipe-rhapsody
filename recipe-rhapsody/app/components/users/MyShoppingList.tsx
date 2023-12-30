"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getRecipeSummary } from "../../../lib/spoonacular";

const getMyShoppingList = async (userEmail: string) => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("shopping_list")
    .select()
    .eq("user_email", userEmail); // Filter recipes by user email

  if (error) {
    console.error(error.message);
    return [];
  }

  const ingredients = await Promise.all(
    data.map(async (savedRecipe) => {
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
  return ingredients.filter((recipe) => recipe !== null);
};

export default getMyShoppingList;
