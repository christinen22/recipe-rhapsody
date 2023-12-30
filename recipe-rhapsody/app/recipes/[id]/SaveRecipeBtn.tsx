import { addRecipe } from "../../../utils/actions";
import { Recipe } from "../../../types/recipe";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";

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

  return (
    <Button className={styles.addBtn} onClick={handleAddRecipeClick}>
      Add Recipe
    </Button>
  );
};

export default SaveRecipeButton;
