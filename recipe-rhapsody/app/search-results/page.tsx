"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Recipe, Recipes } from "../types/recipe";
import { getRecipes } from "../../lib/spoonacular";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

const SearchResults = () => {
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const searchParams = useSearchParams();
  const [searched, setSearched] = useState<string>("");

  // 'query' parameter from the search params
  const search = searchParams.get("query");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(search ?? "");
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (search) {
      fetchRecipes();
    }
  }, [search]);

  return (
    <div>
      <h2>Search Results for "{search}"</h2>
      {recipes && recipes.results ? (
        <>
          <ul className={styles.cardGrid}>
            {recipes.results.map((recipe: Recipe) => (
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
        </>
      ) : (
        <p>No recipes available based on your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
