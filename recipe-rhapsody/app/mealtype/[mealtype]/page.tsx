"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "../styles.module.css";
import { Recipes } from "../../../types/recipe";
import { getRecipes } from "../../../lib/spoonacular";
import RecipeList from "../../components/recipe/RecipeList";

function SingleMealType() {
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const { mealtype } = useParams();

  console.log(mealtype);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (mealtype) {
          const data = await getRecipes(String(mealtype));
          setRecipes(data);
          console.log("Query MealType:", data);
        }
      } catch (error) {
        console.error("Error fetching mealtype:", error);
      }
    };

    fetchRecipes();
  }, [mealtype]);

  return (
    <div className={styles.mealtype}>
      <h2>Recipes from meal type "{mealtype}"</h2>
      {recipes && recipes.results ? (
        <>
          <RecipeList query={String(mealtype)} />
        </>
      ) : (
        <p>No recipes available for {selectedMealType} mealtype.</p>
      )}
    </div>
  );
}

export default SingleMealType;
