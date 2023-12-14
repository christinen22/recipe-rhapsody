"use client";
import Image from "next/image";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <div className={`grid-container ${styles.heroContainer}`}>
      <h1 className={styles.title}>
        Search for you next adventure in the kitchen
      </h1>
      <Image
        src="/images/hero-img.jpg"
        width={1000}
        height={760}
        className={styles.heroImage}
        alt="Image of food"
      />
    </div>
  );
};

export default Hero;
