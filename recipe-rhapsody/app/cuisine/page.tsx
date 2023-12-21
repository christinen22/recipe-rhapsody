"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { getRecipes } from "../../lib/spoonacular";
import { Recipes } from "../../types/recipe";
import { useRouter, useSearchParams } from "next/navigation";

const cuisines = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const Cuisine = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipes | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(selectedCuisine);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching cuisine:", error);
      }
    };

    if (selectedCuisine) {
      fetchRecipes();
    }
  }, [selectedCuisine]);

  console.log(selectedCuisine);

  const handleClick = () => {
    router.push(`/cuisine?query=${encodeURIComponent(selectedCuisine)}`);
  };

  return (
    <div className={styles.cuisine}>
      <h2>Recipes by Cuisine</h2>
      <div>
        <ul className={styles.navList}>
          {cuisines.map((cuisine) => (
            <li key={cuisine}>
              <Link href={`/cuisine/${encodeURIComponent(cuisine)}`} passHref>
                <Button
                  onClick={() => handleClick()}
                  className={styles.navLink}
                >
                  {cuisine}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cuisine;
