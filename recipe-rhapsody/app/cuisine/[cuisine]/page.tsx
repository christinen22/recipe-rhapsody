"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "../styles.module.css";
import { Recipes } from "../../../types/recipe";
import { getRecipes } from "../../../lib/spoonacular";
import RecipeList from "../../components/recipe/RecipeList";
import { useRouter } from "next/navigation";

function SingleCuisine() {
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const { cuisine } = useParams();
  const router = useRouter();

  console.log(cuisine);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (cuisine) {
          const data = await getRecipes(String(cuisine));
          setRecipes(data);
          console.log("Query Cuisine:", data);
        }
      } catch (error) {
        console.error("Error fetching cuisine:", error);
      }
    };

    fetchRecipes();
  }, [cuisine]);

  return (
    <div className={styles.cuisine}>
      <h2>Recipes from cuisine "{cuisine}"</h2>
      {recipes && recipes.results ? (
        <>
          <RecipeList query={String(cuisine)} />
        </>
      ) : (
        <p>No recipes available for {selectedCuisine} cuisine.</p>
      )}
    </div>
  );
}

export default SingleCuisine;
