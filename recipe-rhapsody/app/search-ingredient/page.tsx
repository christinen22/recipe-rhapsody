"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRecipesByIngredients } from "../../lib/spoonacular";
import { Image } from "react-bootstrap";
import styles from "./styles.module.css";
import Link from "next/link";
import SaveRecipeButton from "../recipes/[id]/SaveRecipeBtn";
import { IngredientSearch, Recipe } from "../../types/recipe";

const SearchIngredients = () => {
  const [recipes, setRecipes] = useState<IngredientSearch[]>([]);
  const searchParams = useSearchParams();

  // 'ingredients' parameter from the search params
  const ingredients = searchParams.get("ingredients");

  const fetchRecipes = async (ingredients: string) => {
    try {
      const data = await getRecipesByIngredients(String(ingredients));
      setRecipes(data);
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    setRecipes([]);
  }, [ingredients]);

  useEffect(() => {
    fetchRecipes(String(ingredients));
  }, [ingredients]);

  return (
    <div>
      <h2>Search Results for {ingredients}</h2>

      <ul className={styles.cardGrid}>
        {recipes.map((recipe: IngredientSearch, id) => (
          <li key={id} className={styles.card}>
            <Link href={`/recipes/${recipe.id}`} className={styles.link}>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={200}
                height={200}
                className={styles.image}
              />
              <h3 className={styles.title}>{recipe.title}</h3>
            </Link>
            <SaveRecipeButton recipe={recipe as Recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchIngredients;
