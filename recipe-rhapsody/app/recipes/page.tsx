import RecipeList from "../components/recipe/RecipeList";

const RecipesPage = () => {
  return (
    <div>
      <h1>Recipes</h1>
      <RecipeList query="italian" />
    </div>
  );
};

export default RecipesPage;
