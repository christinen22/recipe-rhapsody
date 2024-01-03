"use client";

import styles from "./Register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Register = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/my-page");
  };

  const handleClickSignup = () => {
    router.push("/signup");
  };

  return (
    <div className={styles.container}>
      <span className={styles.text}>
        Save your favorite recipes and get cooking
      </span>
      <div className={styles.buttons}>
        <Button className={styles.button} onClick={handleClickSignup}>
          Register
        </Button>
        <Button className={styles.button} onClick={handleClick}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Register;
