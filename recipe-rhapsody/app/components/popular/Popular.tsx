"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPopularDesserts } from "../../../lib/spoonacular";
import { Recipes, Recipe } from "../../../types/recipe";
import styles from "./Popular.module.css";

const Popular = () => {
  const [popularRecipes, setPopularRecipes] = useState<Recipes | null>(null);

  useEffect(() => {
    const fetchPopularDesserts = async () => {
      try {
        const data = await getPopularDesserts();
        setPopularRecipes(data);
      } catch (error) {
        console.error("Error fetching popular desserts:", error);
      }
    };

    fetchPopularDesserts();
  }, []);

  return (
    <div className={styles.recipeList}>
      <h2 className={styles.cTitle}>Popular Desserts</h2>
      <div className={styles.cardGrid}>
        {popularRecipes?.results
          ?.slice(0, 10)
          .map((recipe: Recipe, index: any) => (
            <div key={index} className={styles.card}>
              <Link
                href={`/recipes/${recipe.id}`}
                passHref
                className={styles.link}
              >
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={200}
                  height={200}
                  className={styles.image}
                />
                <h3 className={styles.title}>{recipe.title}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Popular;
