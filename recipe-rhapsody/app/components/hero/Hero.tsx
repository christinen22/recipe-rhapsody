import Search from "../search/Search";
import Welcome from "../users/Welcome";
import styles from "./Hero.module.css";

const Hero: React.FC = async () => {
  return (
    <div className={`grid-container ${styles.heroContainer}`}>
      <h2 className={styles.title}>
        Search for you next adventure in the kitchen
      </h2>
      <Search />
    </div>
  );
};

export default Hero;
