"use client";

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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const mealtypes = [
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

// ... (other imports)

function MealTypeRecipes() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery<Recipes>({
    queryKey: ["mealtype", searchParams.get("query")],
    queryFn: () => getRecipes(searchParams.get("query") ?? ""),
  });

  const handleClick = (mealtype: string) => {
    router.push(`/mealtype/${encodeURIComponent(mealtype)}`);
    //queryClient.invalidateQueries({ queryKey: ["mealtype", mealtype] });
  };

  return (
    <div className={styles.mealtype}>
      <h2 className={styles.title}>Recipes by MealType</h2>

      <div className={styles.navList}>
        {/* Show dropdown for mobile view */}
        <Dropdown className={styles.dropdown}>
          <DropdownTrigger>
            <Button variant="outline-primary" className={styles.dropdownBtn}>
              {searchParams.get("query") || "Select Mealtype"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu className={styles.dropdownMenu}>
            {mealtypes.map((mealtype) => (
              <DropdownItem
                key={mealtype}
                onClick={() => handleClick(mealtype)}
                className={styles.dropdownItem}
              >
                {mealtype}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Show buttons for desktop and tablet view */}
        {mealtypes.map((mealtype) => (
          <Link
            href={`/mealtype/${encodeURIComponent(mealtype)}`}
            passHref
            key={mealtype}
            className={styles.link}
          >
            <Button
              className={`${styles.button} ${
                searchParams.get("query") === mealtype
                  ? styles.activeButton
                  : ""
              }`}
              onClick={() => handleClick(mealtype)}
            >
              {mealtype}
            </Button>
          </Link>
        ))}
      </div>

      {isLoading && <p>Loading recipes...</p>}
      {isError && <p>Error loading recipes. Please try again.</p>}

      {recipes && recipes.results ? (
        <RecipeList query={searchParams.get("query") || ""} />
      ) : null}
    </div>
  );
}

export default MealTypeRecipes;
