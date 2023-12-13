import styles from "./styles.module.scss";

export default function CuisineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.cuisine}>{children}</section>;
}
