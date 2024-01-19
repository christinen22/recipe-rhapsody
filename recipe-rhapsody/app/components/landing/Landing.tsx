import styles from "./styles.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Introducing Recipe Rhapsody
        <br />
        Your Culinary Symphony!
      </h2>
      <span className={styles.text}>
        🍽️ Explore, Save, Create: Elevate your cooking experience with Recipe
        Rhapsody, the ultimate destination for food enthusiasts like you!
      </span>
    </div>
  );
};

export default Landing;
