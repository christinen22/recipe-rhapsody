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
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");

  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = searchParams.get("query") ?? "";

  const { data: cuisine } = useQuery({
    queryKey: ["cuisine", { query }],
    queryFn: () => getRecipes(query),
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["cuisine", { query }],
    });
  }, [selectedCuisine, queryClient]);

  console.log(query);

  const handleClick = () => {
    const formattedCuisineQueryParam = encodeURIComponent(
      cuisineQueryParam
    ).replace(/%20/g, "+");
    router.push(`/cuisine/${formattedCuisineQueryParam}`);
  };
  return (
    <div className={styles.cuisine}>
      <h2 className={styles.title}>Recipes by Cuisine</h2>
      <div>
        <ul className={styles.navList}>
          {cuisines.map((cuisine) => (
            <li key={cuisine}>
              <Link
                href={`/cuisine/${encodeURIComponent(cuisine)}`}
                passHref
                className={styles.navLink}
              >
                <Button onClick={() => handleClick()} className={styles.button}>
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
