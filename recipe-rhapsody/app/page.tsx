"use client";

import React, { useEffect, useState } from "react";
import Hero from "./components/hero/Hero";
import { getCuisine } from "./api/Spoonacular";
import { CuisineResponse, Cuisine } from "./types/recipe";

function HomePage() {
  const [cuisineData, setCuisineData] = useState<CuisineResponse | null>(null);

  useEffect(() => {
    // Replace 'indian' with the desired cuisine or make it dynamic based on user input
    const cuisineQuery = "italian";

    // Make the API call
    getCuisine(cuisineQuery)
      .then((data) => {
        // Update state with the fetched data
        setCuisineData(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching cuisine data:", error);
      });
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <main>
      <h2>Recipe Rhapsody</h2>
      <Hero />
      {cuisineData?.results.map((cuisine: Cuisine) => (
        <div>
          <h3>Featured Cuisine</h3>
          {/* Display the fetched cuisine data as needed */}
          {/* Example: */}
          <p>{cuisine.title}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </main>
  );
}

export default HomePage;
