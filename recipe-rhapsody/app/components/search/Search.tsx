"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Button } from "react-bootstrap";
import * as API from "../../../lib/spoonacular";

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

  console.log(recipes);

  return (
    <>
      <Form className="mb-4 search-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Label>Search Recipe</Form.Label>
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter your search query"
            required
            type="text"
            value={searchInput}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            type="submit"
            disabled={!searchInput.trim().length}
          >
            Search
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Search;
