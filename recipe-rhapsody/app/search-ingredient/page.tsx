"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRecipesByIngredients } from "../../lib/spoonacular";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import styles from "./styles.module.css";
import Link from "next/link";
import SaveRecipeButton from "../recipes/[id]/SaveRecipeBtn";
import Filter from "../components/filter/Filter";
import { IngredientSearch, Recipe } from "../../types/recipe";

const SearchIngredients = () => {
  const [recipes, setRecipes] = useState<IngredientSearch[]>([]);
  const searchParams = useSearchParams();
  const [diet, setDiet] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 'ingredients' parameter from the search params
  const ingredients = searchParams.get("ingredients");

  const fetchRecipes = async (
    page: number,
    ingredients: string,
    diet: string | null
  ) => {
    try {
      const data = await getRecipesByIngredients(
        String(ingredients),
        String(diet)
      );
      setRecipes(data);
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    setRecipes([]);
    setCurrentPage(1);
  }, [ingredients, diet]);

  useEffect(() => {
    fetchRecipes(currentPage, String(ingredients), diet);
  }, [currentPage, ingredients, diet]);

  const handleFilterChange = (selectedPreferences: string[]) => {
    console.log("Selected Preferences in RecipeList:", selectedPreferences);
    setDiet(selectedPreferences.join(","));
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Search Results for {ingredients}</h2>
      <Filter onFilterChange={handleFilterChange} />

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
      <Button className={styles.button} onClick={loadMore}>
        Load More
      </Button>
    </div>
  );
};

export default SearchIngredients;
