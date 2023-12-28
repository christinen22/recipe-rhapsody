import { addRecipe } from "../../utils/actions";
import { Recipe } from "../../types/recipe";

interface SaveRecipeButtonProps {
  recipe: Recipe;
}

interface AddRecipeResponse {
  data?: any;
  error?: Error | string;
}

const SaveRecipeButton: React.FC<SaveRecipeButtonProps> = ({ recipe }) => {
  const handleAddRecipeClick = async () => {
    try {
      // Trigger the addRecipe function
      const response: AddRecipeResponse = await addRecipe(recipe);

      if (response.error) {
        console.error("Error adding recipe:", response.error);
      } else {
        console.log("Recipe added successfully!");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return <button onClick={handleAddRecipeClick}>Add Recipe</button>;
};

export default SaveRecipeButton;
