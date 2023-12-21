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
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={300}
          className={styles.image}
        />
      </div>
    </>
  );
};

export default SingleRecipePage;
