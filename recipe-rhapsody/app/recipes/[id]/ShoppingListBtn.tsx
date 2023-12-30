import { addToShoppingList } from "../../../utils/actions";
import { Recipe } from "../../../types/recipe";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";

interface SaveIngredientsButtonProps {
  recipe: Recipe;
}

interface AddIngredientsResponse {
  data?: any;
  error?: Error | string;
  success?: Boolean;
}

// Import statements...

const ShoppingListBtn: React.FC<SaveIngredientsButtonProps> = ({ recipe }) => {
  const handleAddIngredientsClick = async () => {
    try {
      // Trigger the addToShoppingList function
      const response: AddIngredientsResponse = await addToShoppingList(recipe);

      if (response.success) {
        console.log("Ingredients added successfully!");
      } else {
        console.error("Error adding ingredients:", response.error);
      }
    } catch (error) {
      console.error("Error adding ingredients:", error);
    }
  };

  return (
    <Button className={styles.addBtn} onClick={handleAddIngredientsClick}>
      Add Recipe
    </Button>
  );
};

export default ShoppingListBtn;
