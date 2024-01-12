"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "../styles.module.css";
import { Recipes } from "../../../types/recipe";
import { getRecipes } from "../../../lib/spoonacular";
import RecipeList from "../../components/recipe/RecipeList";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";

function SingleCuisine() {
  const { cuisine } = useParams();
  const router = useRouter();

  const decodedCuisine = decodeURIComponent(String(cuisine));

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery<Recipes>({
    queryKey: ["cuisine", cuisine],
    queryFn: () => getRecipes(cuisine as string),
  });

  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.cuisine}>
      <Button className={styles.goBackButton} onClick={goBack}>
        Go Back
      </Button>
      <h2>Recipes from cuisine {decodedCuisine}</h2>
      {isLoading && <Loading />}
      {isError && <p>Error loading recipes. Please try again.</p>}

      {recipes && recipes.results ? (
        <RecipeList query={decodedCuisine} />
      ) : (
        <p>No recipes available for {cuisine} cuisine.</p>
      )}
    </div>
  );
}

export default SingleCuisine;
