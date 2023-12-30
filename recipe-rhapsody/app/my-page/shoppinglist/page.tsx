"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "../styles.module.css";
import getMyShoppingList from "../../components/users/MyShoppingList";
import { Recipe } from "../../../types/recipe";
import { User } from "../../../types/recipe";
import { Button } from "react-bootstrap";

interface Ingredient {
  name: string;
}

const ShoppingListPage = () => {
  const router = useRouter();
  const [shoppingList, setShoppingList] = useState<Recipe[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      // Check user authentication status
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const userEmail = data.session.user.email;

        // Fetch user-specific recipes
        try {
          const userRecipes = await getMyShoppingList(String(userEmail));
          setShoppingList(userRecipes);
          setUser({
            email: data.session.user.email || "",
          });
        } catch (error) {
          console.error("Error fetching user recipes:", error);
        }
      }
    };

    fetchData();
  }, []);

  const goBack = () => {
    router.back();
  };

  const handleExportClick = (recipe: Recipe) => {
    const recipeText = `${recipe.title}: ${recipe.extendedIngredients
      .map((ingredient) => ingredient.name)
      .join(", ")}`;

    // Create a Blob from the text content
    const blob = new Blob([recipeText], { type: "text/plain" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${recipe.title}_shopping_list.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Your Shopping List</h1>
      {shoppingList ? (
        <>
          {shoppingList.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <ul className={styles.ingredientsList}>
                {item.extendedIngredients.map((ingredient, subIndex) => (
                  <li key={`${index}-${subIndex}`}>{ingredient.name}</li>
                ))}
              </ul>
              <Button
                className={styles.button}
                onClick={() => handleExportClick(item)}
              >
                Export Shopping List
              </Button>
            </div>
          ))}
        </>
      ) : (
        <p>Your shopping list is empty.</p>
      )}
    </div>
  );
};

export default ShoppingListPage;
