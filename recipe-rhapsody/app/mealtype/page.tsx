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

const MealTypes = [
  "Main Course",
  "Side Dish",
  "Dessert",
  "Appetizer",
  "Salad",
  "Bread",
  "Breakfast",
  "Soup",
  "Beverage",
  "Sauce",
  "Marinade",
  "Fingerfood",
  "Snack",
  "Drink",
];

function MealTypeRecipes() {
  const [selectedMealType, setSelectedMealType] = useState<string | null>("");
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async (MealType: string) => {
    try {
      setLoading(true);
      const data = await getRecipes(MealType);
      setRecipes(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching MealType:", error);
      setError("Error fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMealType) {
      fetchRecipes(selectedMealType);
    }
  }, [selectedMealType]);

  return (
    <div className={styles.mealtype}>
      <h2 className={styles.title}>Recipes by MealType</h2>

      <div className={styles.navList}>
        {/* Show dropdown for mobile view */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="outline-primary" className={styles.dropdownBtn}>
              {selectedMealType || "Select MealType"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu className={styles.dropdownMenu}>
            {MealTypes.map((MealType) => (
              <DropdownItem
                key={MealType}
                onClick={() => {
                  setSelectedMealType(MealType);
                }}
                className={styles.dropdownItem}
              >
                {MealType}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Show buttons for desktop and tablet view */}
        {MealTypes.map((MealType) => (
          <Button
            className={`${styles.button} ${
              selectedMealType === MealType ? styles.activeButton : ""
            }`}
            key={MealType}
            variant="outline-primary"
            onClick={() => setSelectedMealType(MealType)}
            active={selectedMealType === MealType}
          >
            {MealType}
          </Button>
        ))}
      </div>

      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}

      {selectedMealType && recipes && recipes.results ? (
        <RecipeList query={String(selectedMealType)} />
      ) : null}
    </div>
  );
}

export default MealTypeRecipes;
