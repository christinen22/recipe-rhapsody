"use client";

import { useState, useEffect } from "react";
import { addRecipe } from "../../../utils/actions";
import { Recipe } from "../../../types/recipe";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "../styles.module.css";
import { toast } from "react-toastify";

interface SaveRecipeButtonProps {
  recipe: Recipe;
  savedRecipeIds: number[];
  onRecipeSave: (recipeId: number) => void;
}

const SaveRecipeButton: React.FC<SaveRecipeButtonProps> = ({
  recipe,
  savedRecipeIds = [],
  onRecipeSave,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const recipeIdString = Number(recipe.id);
    setIsSaved(savedRecipeIds.includes(recipeIdString));
  }, [savedRecipeIds, recipe.id]);

  const handleAddRecipeClick = async () => {
    try {
      // Check if the recipe is already saved before trying to add it
      if (isSaved) {
        toast.info("Recipe is already in your library.");
        return;
      }

      const response = await addRecipe(recipe);

      if (response.success) {
        setIsSaved(true);
        onRecipeSave(recipe.id);
        toast.success("Recipe added successfully!");
      } else {
        toast.error("You have to be logged in to add a recipe");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <button className={styles.heartBtn} onClick={handleAddRecipeClick}>
      {isSaved ? <FaHeart color="red" /> : <FaRegHeart color="black" />}
    </button>
  );
};

export default SaveRecipeButton;
