"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Logout from "../components/users/Logout";
import getMyRecipes from "../components/users/MyRecipes";
import styles from "./styles.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Recipe, User } from "../../types/recipe";
import Link from "next/link";
import { Image } from "react-bootstrap";
import Login from "../components/users/Login";
import Welcome from "../components/users/Welcome";
import { useRouter } from "next/navigation";
import Loading from "../components/loading/Loading";

const MyPage = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Check user authentication status
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const userEmail = data.session.user.email;

        // Fetch user-specific recipes
        try {
          const userRecipes = await getMyRecipes(String(userEmail));
          setRecipes(userRecipes);
          setUser({
            email: data.session.user.email || "",
          });
        } catch (error) {
          console.error("Error fetching user recipes:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = async (recipe: Recipe) => {
    // Delete the recipe from the shopping_list table
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("recipe_id", recipe.id);

      if (error) {
        console.error("Error deleting recipe:", error);
      } else {
        // Remove the deleted recipe from the state
        setRecipes((prevList) =>
          prevList ? prevList.filter((item) => item.id !== recipe.id) : []
        );
        console.log("Recipe deleted successfully!");
      }
      console.log("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleClickShopping = () => {
    router.push("/my-page/shoppinglist");
  };

  const handleClickProfile = () => {
    router.push("/my-page/profile");
  };

  return (
    <div>
      {loading ? (
        <p className={`${styles.loading} ${styles.pulsating}`}>Loading...</p>
      ) : user ? (
        <>
          <Welcome />
          <Logout />
          <div className={styles.buttons}>
            <Button className={styles.button} onClick={handleClickShopping}>
              My Shopping List
            </Button>
            <Button className={styles.button} onClick={handleClickProfile}>
              My Profile
            </Button>
          </div>
          <h1>My Saved Recipes</h1>
          {recipes ? (
            <ul className={styles.cardGrid}>
              {recipes.map((recipe: Recipe, index) => (
                <li key={index} className={styles.card}>
                  <Link href={`/recipes/${recipe.id}`} className={styles.link}>
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={200}
                      height={200}
                      className={styles.image}
                    />
                    <h3 className={styles.title}>{recipe.title}</h3>
                  </Link>
                  <Button
                    className={styles.buttonDelete}
                    onClick={() => handleDeleteClick(recipe)}
                  >
                    Delete Recipe
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading recipes...</p>
          )}
        </>
      ) : (
        <>
          <p className={styles.login}>
            Please log in to view your saved recipes.
          </p>
          <Login />
          <br />
          <p className={styles.login}>
            Not a user yet? <Link href="/signup">Signup!</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default MyPage;
