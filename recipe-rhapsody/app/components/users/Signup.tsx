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

  const isExistingUser = async (email: string) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.getUser(email);

    return data !== null;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string
  ): Promise<void> => {
    e.preventDefault();

    const emailExists = await isExistingUser(email);

    console.log(emailExists);

    if (emailExists) {
      toast.error(
        "Email is already registered. Please log in or use a different email."
      );
      return;
    }

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
