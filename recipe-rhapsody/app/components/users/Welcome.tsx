"use client";

import styles from "./Users.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../../../types/recipe";

const Welcome: React.FC = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Get the session data
        const { data } = await supabase.auth.getSession();

        // If no user is logged in, redirect to "/"
        if (!data?.session?.user) {
          router.push("/");
        } else {
          setUser({
            email: data.session.user.email || "",
          });
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };

    // Call the checkUser function
    checkUser();
  }, [router, supabase]);

  return (
    <div className={styles.welcomeContainer}>
      {user && (
        <span className={styles.welcome}>
          Welcome <br />
          {user.email}
        </span>
      )}
    </div>
  );
};

export default Welcome;
