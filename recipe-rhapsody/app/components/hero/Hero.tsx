"use client";
import Search from "../search/Search";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <div className={`grid-container ${styles.heroContainer}`}>
      <h1 className={styles.title}>
        Search for you next adventure in the kitchen
      </h1>
      <Search />
    </div>
  );
};

export default Hero;
