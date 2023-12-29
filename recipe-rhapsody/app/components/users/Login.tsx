"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./Users.module.css";
import Link from "next/link";

import AuthForm from "../../(auth)/AuthForm";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    setError("");

    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
    if (!error) {
      router.push("/");
    }
  };
  [];
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      <AuthForm handleSubmit={handleSubmit} />

      <p className={styles.login}>
        Not a user yet? <Link href="/signup">Signup!</Link>
      </p>

      {error && <div className="error">{error}</div>}
    </main>
  );
}
