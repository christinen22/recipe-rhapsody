import { Recipe } from "../../types/recipe";

type RecipeItemProps = {
  recipe: Recipe;
};

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  return (
    <div>
      <h3>{recipe.title}</h3>
    </div>
  );
};

export default RecipeItem;
