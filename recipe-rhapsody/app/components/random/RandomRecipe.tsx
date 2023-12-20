"use client";

import { useEffect, useState } from "react";
import { getRandomRecipes } from "../../../lib/spoonacular";
import { Recipe } from "../../../types/recipe";
import Image from "next/image";
import { Button } from "react-bootstrap";
import styles from "./RandomRecipe.module.css";

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomRecipe = async () => {
    try {
      const response = await getRandomRecipes();

      if (response && response.recipes && response.recipes.length > 0) {
        const randomRecipe = response.recipes[0];

        if (!randomRecipe || !randomRecipe.title) {
          throw new Error("No valid recipe found");
        }

        setRecipe(randomRecipe);
      } else {
        throw new Error("No recipes found in the response");
      }
    } catch (error) {
      setError("Error loading random recipe");
      console.error("Error in recipe component:", error);
    }
  };

  //Button for generating new random recipe
  const handleGenerateNewRecipe = () => {
    setRecipe(null);
    fetchRandomRecipe();
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Random recipe of today</h2>
        <h3 className={styles.heading}>{recipe.title}</h3>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={300}
          className={styles.image}
        />
        <Button className={styles.button} onClick={handleGenerateNewRecipe}>
          Generate New Recipe
        </Button>
      </div>
    </>
  );
};

export default RandomRecipe;
