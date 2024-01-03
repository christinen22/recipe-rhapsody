import styles from "./Popular.module.css";
import Link from "next/link";
import Image from "next/image";

const cuisines = [
  { name: "Asian", image: "/images/asian.jpg" },
  //{ name: "American", image: "/images/american.jpg" },
  { name: "Indian", image: "/images/indian.jpg" },
  { name: "Italian", image: "/images/italian.jpg" },
  { name: "Mediterranean", image: "/images/mediterranean.jpg" },
];

const Popular = () => {
  return (
    <div className={styles.cuisineList}>
      <h2 className={styles.title}>Popular Categories</h2>
      <div className={styles.cuisineGrid}>
        {cuisines.map((cuisine) => (
          <Link
            href={`/cuisine/${encodeURIComponent(cuisine.name)}`}
            className={styles.link}
            passHref
          >
            <div key={cuisine.name} className={styles.cuisineCard}>
              <Image
                width={350}
                height={350}
                src={cuisine.image}
                alt={cuisine.name}
                className={styles.image}
              />
              <p className={styles.cuisineTitle}>{cuisine.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popular;
