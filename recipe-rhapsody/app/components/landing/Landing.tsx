import styles from "./styles.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Introducing Recipe Rhapsody – Your Culinary Symphony!
      </h2>
      <span className={styles.text}>
        🍽️ Explore, Save, Create: Elevate your cooking experience with Recipe
        Rhapsody, the ultimate destination for food enthusiasts like you!
      </span>
      <span className={styles.text}>
        🔍 Search Delight: Dive into a world of endless culinary possibilities.
        Search and discover a bunch of recipes that cater to every taste bud and
        occasion. From savory meals to sweet delights, Recipe Rhapsody has your
        cravings covered.{" "}
      </span>
    </div>
  );
};

export default Landing;
