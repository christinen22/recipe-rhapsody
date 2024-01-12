"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Recipes } from "../../types/recipe";
import { getRecipes } from "../../lib/spoonacular";
import RecipeList from "../components/recipe/RecipeList";
import styles from "./styles.module.css";

const SearchResults = () => {
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // 'query' parameter from the search params
  const search = searchParams.get("query");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(search ?? "");
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    if (search) {
      fetchRecipes();
    }
  }, [search]);

  return (
    <div>
      {loading ? (
        <p className={`${styles.loading} ${styles.pulsating}`}>Loading...</p>
      ) : (
        <>
          <h2>Search Results for {search}</h2>
          {recipes && recipes.results ? (
            <RecipeList query={String(search)} />
          ) : (
            <p>No recipes available based on your search.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
