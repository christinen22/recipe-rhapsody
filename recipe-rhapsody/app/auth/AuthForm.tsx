"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";

interface AuthFormProps {
  handleSubmit: (
    e: React.FormEvent,
    email: string,
    password: string
  ) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form onSubmit={(e) => handleSubmit(e, email, password)}>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <Button>Submit</Button>
    </form>
  );
};

export default AuthForm;
