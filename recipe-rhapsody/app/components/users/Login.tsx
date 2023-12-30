"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./Users.module.css";
import Link from "next/link";
import ForgotPassword from "./ForgotPassword";

import AuthForm from "../../(auth)/AuthForm";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handlePasswordResetSuccess = () => {
    setShowPasswordReset(false); // Hide the password reset form after success
  };

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

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      <AuthForm handleSubmit={handleSubmit} />

      {showPasswordReset ? (
        <ForgotPassword onSuccess={handlePasswordResetSuccess} />
      ) : (
        <p className={styles.resetText}>
          <a
            className={styles.reset}
            onClick={() => setShowPasswordReset(true)}
          >
            Forgot Password?
          </a>
        </p>
      )}

      {error && <div className="error">{error}</div>}
    </main>
  );
}
