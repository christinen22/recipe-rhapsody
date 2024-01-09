"use client";

import styles from "./RecipeList.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { getRecipes } from "../../../lib/spoonacular";
import { Recipe } from "../../../types/recipe";
import SaveRecipeButton from "../../recipes/[id]/SaveRecipeBtn";
import Filter from "../filter/Filter";

type RecipeListProps = {
  query: string;
};

const RecipeList = ({ query }: RecipeListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [diet, setDiet] = useState<string | null>(null);
  const [hasMorePages, setHasMorePages] = useState(true);

  const fetchRecipes = async (
    page: number,
    searchQuery: string,
    diet: string | null
  ) => {
    try {
      const data = await getRecipes(searchQuery, page, String(diet));
      setRecipes((prevRecipes) => [...prevRecipes, ...data.results]);
      setHasMorePages(data.offset + data.number < data.totalResults);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    setRecipes([]);
    setCurrentPage(1);
    setHasMorePages(true);
  }, [query, diet]);

  useEffect(() => {
    fetchRecipes(currentPage, query, diet);
  }, [currentPage, query, diet]);

  const loadMore = () => {
    if (hasMorePages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleFilterChange = (selectedPreferences: string[]) => {
    setDiet(selectedPreferences.join(","));
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
      <button
        className={styles.button}
        onClick={loadMore}
        disabled={!hasMorePages}
      >
        {hasMorePages ? "Load More" : "That's it"}
      </button>
    </div>
  );
};

export default RecipeList;
