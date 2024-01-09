"use client";

import { getRecipeSummary } from "../../../lib/spoonacular";
import { Recipe } from "../../../types/recipe";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styles from "../styles.module.css";
import { Button } from "react-bootstrap";
import SaveRecipeButton from "./SaveRecipeBtn";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { addToShoppingList } from "../../../utils/actions";
import ShoppingListBtn from "./ShoppingListBtn";

const SingleRecipePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const supabase = createClientComponentClient();

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

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.btnContainer}>
        <Button className={styles.goBackButton} onClick={goBack}>
          Go Back
        </Button>
        <SaveRecipeButton recipe={recipe} />
      </div>
      <div className={styles.container}>
        <h3 className={styles.heading}>{recipe.title}</h3>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={200}
          height={200}
          className={styles.image}
        />
        <span className={styles.recipes}>
          Ready in {recipe.readyInMinutes} minutes.
        </span>
        <span className={styles.recipes}>{recipe.servings} servings.</span>
        <div className={styles.ingredients}>
          {recipe.extendedIngredients.map((ingredients, ingredients_id) => (
            <div className={styles.ingredientsOl} key={ingredients_id}>
              <span className={styles.ingredientsLi}>{ingredients.amount}</span>
              <span className={styles.ingredientsLi}>{ingredients.unit}</span>
              <span className={styles.ingredientsLi}>{ingredients.name}</span>
              <br />
            </div>
          ))}
          <ShoppingListBtn recipe={recipe} />
        </div>
        <span
          className={styles.recipes}
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
      </div>
    </>
  );
};

export default SingleRecipePage;
