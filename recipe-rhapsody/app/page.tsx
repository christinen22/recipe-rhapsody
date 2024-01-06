import Hero from "./components/hero/Hero";
import Landing from "./components/landing/Landing";
import Popular from "./components/popular/Popular";
import RandomRecipe from "./components/random/RandomRecipe";
import Register from "./components/register/Register";
import SearchIngredientsComp from "./components/search/SearchIngredientsComp";
import styles from "./page.module.css";

function HomePage() {
  return (
    <main className={styles.main}>
      <Landing />
      <Hero />
      <SearchIngredientsComp />
      <Popular />
      <Register />
      <RandomRecipe />
    </main>
  );
}

export default HomePage;
