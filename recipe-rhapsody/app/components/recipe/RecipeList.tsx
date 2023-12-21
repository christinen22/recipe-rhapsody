"use client";

import styles from "./RecipeList.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRecipes } from "../../../lib/spoonacular";
import { Recipe } from "../../../types/recipe";

type RecipeListProps = {
  query: string;
};

const RecipeList = ({ query }: RecipeListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async (page: number, searchQuery: string) => {
    try {
      const res = await getRecipes(searchQuery, page);
      const newRecipes = res?.results || [];
      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    setRecipes([]);
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    fetchRecipes(currentPage, query);
  }, [currentPage, query]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.recipeList}>
      <ul className={styles.cardGrid}>
        {recipes.map((recipe: Recipe) => (
          <li key={recipe.id} className={styles.card}>
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
          </li>
        ))}
      </ul>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default RecipeList;
