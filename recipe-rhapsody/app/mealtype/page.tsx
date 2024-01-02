"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { getRecipes } from "../../lib/spoonacular";
import { Recipes } from "../../types/recipe";
import { useRouter, useSearchParams } from "next/navigation";

const mealtype = ["Breakfast", "Side Dish"];

const MealType = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes | null>(null);

  const query = searchParams.get("query");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(query ?? "");
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching mealtype:", error);
      }
    };

    if (query) {
      fetchRecipes();
    }
  }, [query]);

  console.log(query);

  const handleClick = () => {
    router.push(`/mealtype?query=${encodeURIComponent(selectedMealType)}`);
  };

  return (
    <div className={styles.mealtype}>
      <h2 className={styles.title}>Recipes by Meal Type</h2>
      <div>
        <ul className={styles.navList}>
          {mealtype.map((mealtype) => (
            <li key={mealtype}>
              <Link
                href={`/mealtype/${encodeURIComponent(mealtype)}`}
                passHref
                className={styles.navLink}
              >
                <Button onClick={() => handleClick()} className={styles.button}>
                  {mealtype}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealType;
