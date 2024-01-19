"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "../styles.module.css";
import { Recipes } from "../../../types/recipe";
import { getRecipes } from "../../../lib/spoonacular";
import RecipeList from "../../components/recipe/RecipeList";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

function SingleMealtype() {
  const { mealtype } = useParams();
  const router = useRouter();

  const decodedMealtype = decodeURIComponent(String(mealtype));

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery<Recipes>({
    queryKey: ["mealtype", mealtype],
    queryFn: () => getRecipes(mealtype as string),
  });

  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.mealtype}>
      <Button className={styles.goBackButton} onClick={goBack}>
        Go Back
      </Button>
      <h2>Recipes from mealtype {decodedMealtype}</h2>
      {isLoading && (
        <p className={`${styles.loading} ${styles.pulsating}`}>Loading...</p>
      )}
      {isError && <p>Error loading recipes. Please try again.</p>}

      {recipes && recipes.results ? (
        <RecipeList query={decodedMealtype} />
      ) : (
        <p>No recipes available for {mealtype} mealtype.</p>
      )}
    </div>
  );
}

export default SingleMealtype;
