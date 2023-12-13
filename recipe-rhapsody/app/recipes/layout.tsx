import styles from "./styles.module.css";

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.recipes}>{children}</section>;
}
