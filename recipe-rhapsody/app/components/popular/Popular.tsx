import styles from "./Popular.module.css";
import Link from "next/link";

const cuisines = [
  { name: "Asian", image: "/images/asian.jpg" },
  { name: "American", image: "/images/american.jpg" },
  { name: "Indian", image: "/images/indian.jpg" },
  { name: "Italian", image: "/images/italian.jpg" },
  { name: "Mediterranean", image: "/images/mediterranean.jpg" },
];

const Popular = () => {
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.title}>Popular Categories</h2>
      <div className={styles.cuisineCard}>
        {cuisines.map((cuisine) => (
          <Link href={`/cuisine`} className={styles.link}>
            <div key={cuisine.name} className={styles.cuisineCard}>
              <img src={cuisine.image} alt={cuisine.name} />
              <p className={styles.cuisineTitle}>{cuisine.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popular;
