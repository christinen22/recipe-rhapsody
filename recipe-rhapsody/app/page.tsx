import Hero from "./components/hero/Hero";
import RandomRecipe from "./components/random/RandomRecipe";
import Register from "./components/register/Register";
import Search from "./components/search/Search";

function HomePage() {
  return (
    <main>
      <Hero />
      <RandomRecipe />
      <Register />
    </main>
  );
}

export default HomePage;
