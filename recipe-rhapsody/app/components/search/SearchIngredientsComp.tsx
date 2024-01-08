import styles from "./Search.module.css";
import SearchIngredients from "./SearchIngredients";
import Ingredients from "../../../public/images/ingredients.jpg";
import Image from "next/image";

const SearchIngredientsComp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <span>
          Do you have a set of ingredients at home and do not know what to do
          with it?
        </span>
        <br />
        <br />
        <span>Perform a search and see what suggestions you get!</span>

        <SearchIngredients />
      </div>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={Ingredients}
          alt="Image of ingredients"
          placeholder="blur"
          quality={100}
        />
      </div>
    </div>
  );
};

export default SearchIngredientsComp;
