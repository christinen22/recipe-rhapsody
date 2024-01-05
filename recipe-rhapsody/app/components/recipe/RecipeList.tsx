"use client";

import styles from "./RecipeList.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRecipes } from "../../../lib/spoonacular";
import { Recipe } from "../../../types/recipe";
import SaveRecipeButton from "../../recipes/[id]/SaveRecipeBtn";
import Filter from "../filter/Filter";
import SearchIngredients from "../search/SearchIngredients";

type RecipeListProps = {
  query: string;
};

const RecipeList = ({ query }: RecipeListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filterPreferences, setFilterPreferences] = useState<string[]>([]);

  const fetchRecipes = async (
    page: number,
    searchQuery: string,
    dietaryPreferences: string[]
  ) => {
    try {
      const data = await getRecipes(
        searchQuery,
        page,
        String(dietaryPreferences)
      );
      setRecipes(data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
    }
  };

  useEffect(() => {
    setRecipes([]);
    setCurrentPage(1);
  }, [query, filterPreferences]);

  useEffect(() => {
    fetchRecipes(currentPage, query, filterPreferences);
  }, [currentPage, query, filterPreferences]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (selectedPreferences: string[]) => {
    setFilterPreferences(selectedPreferences);
  };

  return (
    <div className={styles.recipeList}>
      <Filter onFilterChange={handleFilterChange} />

      <ul className={styles.cardGrid}>
        {recipes.map((recipe: Recipe, id) => (
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
            <SaveRecipeButton recipe={recipe} />
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default RecipeList;
