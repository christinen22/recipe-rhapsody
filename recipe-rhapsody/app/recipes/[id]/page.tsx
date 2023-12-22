"use client";

import { getRecipeSummary } from "../../../lib/spoonacular";
import { Recipe } from "../../../types/recipe";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles.module.css";
import { Button } from "react-bootstrap";

const SingleRecipePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

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
      </div>
      <div className={styles.container}>
        <h3 className={styles.heading}>{recipe.title}</h3>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={200}
          style={{
            objectFit: "contain",
            margin: "2rem",
          }}
        />
        <span className={styles.recipes}>
          Ready in {recipe.readyInMinutes} minutes.
        </span>
        <span className={styles.recipes}>{recipe.servings} servings.</span>
        <div className={styles.ingredients}>
          {recipe.extendedIngredients.map((ingredients) => (
            <>
              <div className={styles.ingredientsOl}>
                <span className={styles.ingredientsLi}>
                  {ingredients.amount}
                </span>
                <span className={styles.ingredientsLi}>{ingredients.unit}</span>
                <span className={styles.ingredientsLi}>{ingredients.name}</span>
                <br />
              </div>
            </>
          ))}
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
