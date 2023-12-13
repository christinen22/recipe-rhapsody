import styles from "./styles.module.css";

export default function CuisineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.cuisine}>{children}</section>;
}
