"use client";

import Link from "next/link";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
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
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery<Recipes>({
    queryKey: ["cuisine", searchParams.get("query")],
    queryFn: () => getRecipes(searchParams.get("query") ?? ""),
  });

  const handleClick = (cuisine: string) => {
    router.push(`/cuisine/${encodeURIComponent(cuisine)}`);
    queryClient.invalidateQueries({ queryKey: ["cuisine", cuisine] });
  };

  return (
    <div className={styles.cuisine}>
      <h2 className={styles.title}>Recipes by Cuisine</h2>

      <div className={styles.navList}>
        {/* Show dropdown for mobile view */}
        <Dropdown className={styles.dropdown}>
          <DropdownTrigger>
            <Button className={styles.dropdownBtn}>
              {searchParams.get("query") || "Select Cuisine"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu className={styles.dropdownMenu}>
            {cuisines.map((cuisine) => (
              <Link
                href={`/cuisine/${encodeURIComponent(cuisine)}`}
                passHref
                key={cuisine}
                className={styles.link}
              >
                <DropdownItem
                  onClick={() => handleClick(cuisine)}
                  className={styles.dropdownItem}
                >
                  {cuisine}
                </DropdownItem>
              </Link>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* Show buttons for desktop and tablet view */}
        {cuisines.map((cuisine) => (
          <Link
            href={`/cuisine/${encodeURIComponent(cuisine)}`}
            passHref
            key={cuisine}
            className={styles.link}
          >
            <Button
              className={`${styles.button} ${
                searchParams.get("query") === cuisine ? styles.activeButton : ""
              }`}
              onClick={() => handleClick(cuisine)}
              /*   active={searchParams.get("query") === cuisine} */
            >
              {cuisine}
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

export default CuisineRecipes;
