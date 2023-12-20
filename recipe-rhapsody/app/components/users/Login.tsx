"use client";

import AuthForm from "../../auth/AuthForm";

const Login = () => {
  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    password: string
  ): Promise<void> => {
    e.preventDefault();

    console.log("user login", email, password);
  };

  return (
    <main>
      <h2>Log in</h2>

      <AuthForm handleSubmit={handleSubmit} />
    </main>
  );
};

export default Login;
