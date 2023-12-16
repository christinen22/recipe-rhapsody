"use client";

import React, { useEffect, useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import styles from "./styles.module.css";
import { CuisineResponse } from "../types/recipe";
import { getRecipes } from "../service/spoonacular";
import Link from "next/link";

function CuisineRecipes() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [recipes, setRecipes] = useState<CuisineResponse | null>(null);

  useEffect(() => {
    if (selectedCuisine) {
      const fetchRecipes = async () => {
        try {
          const data = await getRecipes(selectedCuisine);
          setRecipes(data);
        } catch (error) {
          console.error("Error fetching cuisine:", error);
        }
      };

      fetchRecipes();
    }
  }, [selectedCuisine]);

  return (
    <div className={styles.cuisine}>
      <h2>Recipes by Cuisine</h2>
      <label>
        Select Cuisine:
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
        >
          <option value="indian">Indian</option>
          <option value="mexican">Mexican</option>
        </select>
      </label>

      {recipes && recipes.results ? (
        <CardGroup>
          {recipes.results.map((recipe) => (
            <Link href={`/recipes/${recipe.id}`}>
              <Card key={recipe.id}>
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </CardGroup>
      ) : (
        <p>No recipes available for the selected cuisine.</p>
      )}
    </div>
  );
}

export default CuisineRecipes;
