"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Image, Spinner, Alert } from "react-bootstrap";
import { getRecipes } from "../../../lib/spoonacular";
import { Recipe } from "../../../types/recipe";
import { getSavedRecipeIds } from "../../../utils/actions";
import SaveRecipeButton from "../../recipes/[id]/SaveRecipeBtn";
import Filter from "../filter/Filter";
import styles from "./RecipeList.module.css";
import { toast } from "react-toastify";

type RecipeListProps = {
  query: string;
};

const RecipeList = ({ query }: RecipeListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [diet, setDiet] = useState<string | null>(null);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<number[]>([]);
  const [savedRecipeIdsLoaded, setSavedRecipeIdsLoaded] = useState(false);

  async function fetchSavedRecipeIds() {
    try {
      const response = await getSavedRecipeIds();
      if (!response.success) {
        console.error("Failed to fetch saved recipe IDs");
      }
      const data = response.data || [];
      console.log("Saved recipe IDs:", data);
      setSavedRecipeIds(data);
      setSavedRecipeIdsLoaded(true);
    } catch (error) {
      console.error("Error fetching saved recipe IDs:", error);
      setSavedRecipeIds([]);
      setSavedRecipeIdsLoaded(true);
    }
  }

  const fetchRecipes = async (
    page: number,
    searchQuery: string,
    diet: string | null
  ) => {
    try {
      setLoading(true);
      const data = await getRecipes(searchQuery, page, String(diet));
      setRecipes((prevRecipes) => [...prevRecipes, ...data.results]);
      setHasMorePages(data.offset + data.number < data.totalResults);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Error fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRecipeIds();
  }, []);

  useEffect(() => {
    setRecipes([]);
    setCurrentPage(1);
    setHasMorePages(true);
    setError(null);
  }, [query, diet]);

  useEffect(() => {
    fetchRecipes(currentPage, query, diet);
  }, [currentPage, query, diet]);

  const loadMore = () => {
    if (hasMorePages && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleFilterChange = (selectedPreferences: string[]) => {
    setDiet(selectedPreferences.join(","));
  };

  const handleRecipeSave = (recipeId: number) => {
    // update the savedRecipeIds state when a recipe is saved
    setSavedRecipeIds((prevIds) => [...prevIds, recipeId]);
  };

  return (
    <div className={styles.recipeList}>
      <Filter onFilterChange={handleFilterChange} />

      {error && <Alert variant="danger">{error}</Alert>}

      {recipes.length === 0 && !loading && !error && (
        <Alert variant="info">No results found. Try different filters.</Alert>
      )}

      <ul className={styles.cardGrid}>
        {recipes.map((recipe, key) => (
          <li key={key} className={styles.card}>
            <Link className={styles.link} href={`/recipes/${recipe.id}`}>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={200}
                height={200}
                className={styles.image}
              />
              <h3 className={styles.title}>{recipe.title}</h3>
            </Link>
            <SaveRecipeButton
              recipe={recipe}
              savedRecipeIds={savedRecipeIds}
              onRecipeSave={handleRecipeSave}
            />
          </li>
        ))}
      </ul>

      {loading && <Spinner animation="border" role="status" />}

      {hasMorePages && recipes.length > 0 && (
        <button className={styles.button} onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default RecipeList;
