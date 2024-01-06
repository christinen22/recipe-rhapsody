import styles from "./Search.module.css";
import SearchIngredients from "./SearchIngredients";

const SearchIngredientsComp = () => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>
        Do you have a set of ingredients at home and don&rsquo;t know what to do
        with it?
        <br />
        <br />
        Perform a search and see what suggestions you get!
      </span>
      <SearchIngredients />
    </div>
  );
};

export default SearchIngredientsComp;
