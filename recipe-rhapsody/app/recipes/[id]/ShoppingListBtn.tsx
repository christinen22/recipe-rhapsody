import { addToShoppingList } from "../../../utils/actions";
import { Recipe } from "../../../types/recipe";
import { Button } from "react-bootstrap";
import styles from "../styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("Ingredients added successfully!");
      } else {
        toast.error("Error adding ingredients:");
      }
    } catch (error) {
      toast.error("Error adding ingredients:");
      console.error("Error adding ingredients:", error);
    }
  };

  return (
    <>
      <Button className={styles.addBtn} onClick={handleAddIngredientsClick}>
        Add to Shopping List
      </Button>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default ShoppingListBtn;
