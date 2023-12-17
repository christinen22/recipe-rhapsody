"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import styles from "./styles.module.css";
import { CuisineResponse, Recipe, Recipes } from "../types/recipe";
import { getRecipes } from "../service/spoonacular";
import Link from "next/link";
import RecipeList from "../components/recipelist/RecipeList";

const cuisines = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

function CuisineRecipes() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes | null>(null);

  useEffect(() => {
    if (selectedCuisine) {
      const fetchRecipes = async () => {
        try {
          const data = await getRecipes(selectedCuisine);
          setRecipes(data);
        } catch (error) {
          console.error("Error fetching cuisine:", error);
        }
      };

      fetchRecipes();
    }
  }, [selectedCuisine]);

  return (
    <div className={styles.cuisine}>
      <h2>Recipes by Cuisine</h2>
      <div className={styles.cuisineButtons}>
        {cuisines.map((cuisine) => (
          <Button
            key={cuisine}
            variant="outline-primary"
            onClick={() => setSelectedCuisine(cuisine)}
            active={selectedCuisine === cuisine}
          >
            {cuisine}
          </Button>
        ))}
      </div>

      {recipes && recipes.results ? (
        <RecipeList query={selectedCuisine} recipes={recipes.results} />
      ) : (
        <p>No recipes available for the selected cuisine.</p>
      )}
    </div>
  );
}

export default CuisineRecipes;
