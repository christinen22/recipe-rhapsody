import { addRecipe } from "../../../utils/actions";
import { Recipe } from "../../../types/recipe";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Error adding recipe");
      } else {
        toast.success("Recipe added successfully!");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Error adding recipe");
    }
  };

  return (
    <>
      <Button className={styles.addBtn} onClick={handleAddRecipeClick}>
        Add Recipe
      </Button>
    </>
  );
};

export default SaveRecipeButton;
