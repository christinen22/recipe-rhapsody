"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../../(auth)/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Users.module.css";
import { toast } from "react-toastify";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string
  ): Promise<void> => {
    e.preventDefault();

    const supabase = createClientComponentClient();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError("An error occurred during sign up. Please try again.");
    }
  };

  return (
    <main>
      <h2 className={styles.title}>Sign up</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {error && <div className="error">{error}</div>}
    </main>
  );
}
