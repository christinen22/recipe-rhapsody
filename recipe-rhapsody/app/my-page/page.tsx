"use client";

import { useEffect, useState } from "react";
import Logout from "../components/users/Logout";
import getMyRecipes from "../components/users/MyRecipes";
import styles from "./styles.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Recipe, User } from "../../types/recipe";
import Link from "next/link";
import Image from "next/image";
import Login from "../components/users/Login";

const MyPage = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

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
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Logout />
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
