"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Button } from "react-bootstrap";
import * as API from "../../../lib/spoonacular";
import styles from "./Search.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const { data: recipes } = useQuery({
    queryKey: ["search-recipe", { query }],
    queryFn: () => API.getRecipes(query),
  });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["search-recipe", { query }],
    });
  }, [searchInput, queryClient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }

    router.push(`/search-results?query=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div className={styles.container}>
      <Form className={styles.searchForm} onSubmit={handleSubmit}>
        <Form.Group controlId="searchQuery">
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Recipe Rhapsody"
            required
            type="text"
            value={searchInput}
            className={styles.input}
          />
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          disabled={!searchInput.trim().length}
          className={styles.button}
        >
          <FaMagnifyingGlass />
        </Button>
      </Form>
    </div>
  );
};

export default Search;
