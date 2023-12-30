"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Form } from "react-bootstrap";
import styles from "./Users.module.css";

interface PasswordResetFormProps {
  onSuccess: () => void;
}

const ForgotPassword: React.FC<PasswordResetFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createClientComponentClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setError("Failed to send password reset email");
      } else {
        setError("");
        onSuccess();
      }
    } catch (error) {
      setError("Failed to send password reset email");
    }
  };

  return (
    <Form className={styles.form} onSubmit={handlePasswordReset}>
      <Form.Label>
        Email:
        <Form.Control
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Label>
      <Button className={styles.submitButton} type="submit">
        Reset Password
      </Button>
      {error && <p>{error}</p>}
    </Form>
  );
};

export default ForgotPassword;
