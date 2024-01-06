"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Button } from "react-bootstrap";
import * as API from "../../../lib/spoonacular";
import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";

const SearchIngredients = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [ingredientInput, setIngredientInput] = useState("");
  const searchParams = useSearchParams();

  const ingredients = searchParams.get("ingredients") ?? "";

  const { data: recipes, refetch } = useQuery({
    queryKey: ["search-by-ingredients", { ingredients: ingredients }],
    queryFn: () => API.getRecipesByIngredients(ingredients),
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["search-by-ingredients", { ingredients }],
    });
    console.log("useEffect triggered with ingredients:", ingredientInput);
  }, [ingredients, queryClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ingredientInput.trim().length) {
      return;
    }

    router.push(
      `/search-ingredient?ingredients=${encodeURIComponent(ingredientInput)}`
    );
  };

  return (
    <Form className={styles.searchForm} onSubmit={handleSubmit}>
      <Form.Group controlId="ingredientSearch">
        <Form.Control
          onChange={(e) => setIngredientInput(e.target.value)}
          placeholder="Type ingredients eg. chicken, garlic"
          required
          type="text"
          value={ingredientInput}
          className={styles.input}
        />
      </Form.Group>

      <Button
        variant="success"
        type="submit"
        disabled={!ingredientInput.trim().length}
        className={styles.button}
      >
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchIngredients;
