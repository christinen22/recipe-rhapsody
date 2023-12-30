import Hero from "./components/hero/Hero";
import Popular from "./components/popular/Popular";
import RandomRecipe from "./components/random/RandomRecipe";
import Register from "./components/register/Register";
import Welcome from "./components/users/Welcome";

function HomePage() {
  return (
    <main>
      <Welcome />
      <Hero />
      <Popular />
      <Register />
      <RandomRecipe />
    </main>
  );
}

export default HomePage;
