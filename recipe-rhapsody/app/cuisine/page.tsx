"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import styles from "./styles.module.css";
import { Recipes } from "../../types/recipe";
import { getRecipes } from "../../lib/spoonacular";
import RecipeList from "../components/recipe/RecipeList";
import Search from "../components/search/Search";

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

function Cuisine() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(selectedCuisine);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching cuisine:", error);
      }
    };

    if (selectedCuisine) {
      fetchRecipes();
    }
  }, [selectedCuisine]);

  return (
    <div className={styles.cuisine}>
      <h2>Recipes by Cuisine</h2>
      <div>
        <ul className={styles.navList}>
          {cuisines.map((cuisine) => (
            <li key={cuisine}>
              <Button
                onClick={() => setSelectedCuisine(cuisine)}
                className={`${styles.navLink} ${
                  selectedCuisine === cuisine ? styles.activeNavLink : ""
                }`}
              >
                {cuisine}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {recipes && recipes.results ? (
        <RecipeList query={selectedCuisine} />
      ) : (
        <p>No recipes available for the selected cuisine.</p>
      )}
    </div>
  );
}

export default Cuisine;
