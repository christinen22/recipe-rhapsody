"use client";

import styles from "./RecipeList.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRecipes } from "../../service/spoonacular";
import { Recipe } from "../../types/recipe";

const RecipeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async (page: number) => {
    try {
      const res = await getRecipes("", page);
      const newRecipes = res?.results || [];
      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.recipeList}>
      <ul className={styles.cardGrid}>
        {recipes.map((recipe: Recipe) => (
          <li key={recipe.id} className={styles.card}>
            <Link href={`/recipes/${recipe.id}`}>
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
