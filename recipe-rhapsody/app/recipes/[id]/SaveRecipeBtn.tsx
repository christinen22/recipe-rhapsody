"use client";

import { useState, useEffect } from "react";
import { IngredientSearch, User } from "../../../types/recipe";
import { addRecipe } from "../../../utils/actions";
import { Recipe } from "../../../types/recipe";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SaveRecipeButtonProps {
  recipe: Recipe;
}

interface AddRecipeResponse {
  data?: any;
  error?: Error | string;
}

const SaveRecipeButton: React.FC<SaveRecipeButtonProps> = ({ recipe }) => {
  const supabase = createClientComponentClient();

  const handleAddRecipeClick = async () => {
    try {
      // Check if the user is logged in
      const { data } = await supabase.auth.getSession();
      if (!data?.session?.user) {
        // User is not logged in
        toast.error("Please log in to add recipes.");
        return;
      }

      // Trigger the addRecipe function
      const response: AddRecipeResponse = await addRecipe(recipe);

      if (response.error) {
        toast.error(`Error adding recipe`);
      } else {
        toast.success("Recipe added successfully!");
      }
    } catch (error) {
      toast.error("Error adding recipe");
    }
  };

  return (
    <>
      <Button className={styles.addBtn} onClick={handleAddRecipeClick}>
        Add Recipe
      </Button>
    </>
  );
};

export default SaveRecipeButton;
