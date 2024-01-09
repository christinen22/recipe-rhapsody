"use client";

import styles from "./Register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Image from "next/image";
import RegisterImg from "../../../public/images/register.jpg";

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
      <div className={styles.inner}>
        <span className={styles.text}>
          Create your own library of your favourite recipes. As a user on Recipe
          Rhapsody you can store your shopping lists, export them and take them
          with you to the store.
        </span>
        <span className={styles.text}>
          Save your favorite recipes and get cooking!
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
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={RegisterImg}
          alt="Image of recipe on screen"
          placeholder="blur"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Register;
