"use client";

import { getRecipeSummary } from "../../service/spoonacular";
import { RecipeSummary } from "../../types/recipe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleRecipePage = () => {
  const { id } = useParams();
  console.log(id);
  const [recipe, setRecipe] = useState<RecipeSummary | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          const data = await getRecipeSummary(Number(id));
          console.log(data);
          setRecipe(data);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.summary}</p>
    </div>
  );
};

export default SingleRecipePage;
