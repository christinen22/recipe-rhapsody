"use client";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Recipes } from "../../types/recipe";
import { getRecipes } from "../../lib/spoonacular";
import styles from "./styles.module.css";
import RecipeList from "../components/recipe/RecipeList";

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
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>("");
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async (cuisine: string) => {
    try {
      setLoading(true);
      const data = await getRecipes(cuisine);
      setRecipes(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cuisine:", error);
      setError("Error fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCuisine) {
      fetchRecipes(selectedCuisine);
    }
  }, [selectedCuisine]);

  return (
    <div className={styles.cuisine}>
      <h2 className={styles.title}>Recipes by Cuisine</h2>

      <div className={styles.navList}>
        {/* Show dropdown for mobile view */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="outline-primary" className={styles.dropdownBtn}>
              {selectedCuisine || "Select Cuisine"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu className={styles.dropdownMenu}>
            {cuisines.map((cuisine) => (
              <DropdownItem
                key={cuisine}
                onClick={() => {
                  setSelectedCuisine(cuisine);
                }}
                className={styles.dropdownItem}
              >
                {cuisine}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Show buttons for desktop and tablet view */}
        {cuisines.map((cuisine) => (
          <Button
            className={`${styles.button} ${
              selectedCuisine === cuisine ? styles.activeButton : ""
            }`}
            key={cuisine}
            variant="outline-primary"
            onClick={() => setSelectedCuisine(cuisine)}
            active={selectedCuisine === cuisine}
          >
            {cuisine}
          </Button>
        ))}
      </div>

      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}

      {recipes && recipes.results ? (
        <RecipeList query={String(selectedCuisine)} />
      ) : (
        <p>No recipes available for the selected cuisine.</p>
      )}
    </div>
  );
}

export default CuisineRecipes;
