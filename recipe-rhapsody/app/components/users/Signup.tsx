"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../../(auth)/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Users.module.css";

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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }
    if (!error) {
      router.push("/verify");
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
