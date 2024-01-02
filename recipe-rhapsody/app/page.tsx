import Hero from "./components/hero/Hero";
import Popular from "./components/popular/Popular";
import RandomRecipe from "./components/random/RandomRecipe";
import Register from "./components/register/Register";

function HomePage() {
  return (
    <main>
      <Hero />
      <Popular />
      <Register />
      <RandomRecipe />
    </main>
  );
}

export default HomePage;
