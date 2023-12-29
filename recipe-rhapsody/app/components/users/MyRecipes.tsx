"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getRecipeSummary } from "../../../lib/spoonacular";

const getMyRecipes = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("recipes").select();

  if (error) {
    console.error(error.message);
    return [];
  }

  const recipes = await Promise.all(
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
  return recipes.filter((recipe) => recipe !== null);
};

export default getMyRecipes;