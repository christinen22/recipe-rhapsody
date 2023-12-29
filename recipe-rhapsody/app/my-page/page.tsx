"use client";

import { useEffect, useState } from "react";
import Logout from "../components/users/Logout";
import getMyRecipes from "../components/users/MyRecipes";
import { Recipe } from "../../types/recipe";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

const MyPage = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getMyRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <Logout />
      <h1>My Saved Recipes</h1>
      {recipes ? (
        <ul className={styles.cardGrid}>
          {recipes.map((recipe: Recipe, title) => (
            <li key={title} className={styles.card}>
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
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default MyPage;
