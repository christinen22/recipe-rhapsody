import styles from "./styles.module.css";

const Verify = () => {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Thanks for registering!</h2>
      <p className={styles.info}>
        Before logging in, you need to verify your email address
      </p>
    </main>
  );
};

export default Verify;
