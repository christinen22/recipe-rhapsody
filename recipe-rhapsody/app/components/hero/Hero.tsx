import Search from "../search/Search";
import styles from "./Hero.module.css";

const Hero: React.FC = async () => {
  return (
    <div className={`grid-container ${styles.heroContainer}`}>
      <h2 className={styles.title}>
        Search for you next adventure in the kitchen
      </h2>
      <span className={styles.text}>
        Do you know "kind of" what you want to create in the kitchen? Search
        through our library of yummy recipes!
      </span>
      <Search />
    </div>
  );
};

export default Hero;
