import { useState } from "react";
import { Button } from "@nextui-org/react";
import styles from "./styles.module.css";

interface DietaryFilterProps {
  onFilterChange: (selectedPreferences: string[]) => void;
}

const Filter: React.FC<DietaryFilterProps> = ({ onFilterChange }) => {
  const [vegetarian, setVegetarian] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);

  const handleFilterChange = () => {
    const selectedPreferences: string[] = [];

    if (vegetarian) {
      selectedPreferences.push("vegetarian");
    }

    if (glutenFree) {
      selectedPreferences.push("glutenFree");
    }

    if (dairyFree) {
      selectedPreferences.push("dairyFree");
    }

    onFilterChange(selectedPreferences);
  };

  return (
    <div>
      <label className={styles.label}>
        Vegetarian
        <input
          type="checkbox"
          checked={vegetarian}
          onChange={() => setVegetarian(!vegetarian)}
        />
      </label>
      <label className={styles.label}>
        Gluten-Free
        <input
          type="checkbox"
          checked={glutenFree}
          onChange={() => setGlutenFree(!glutenFree)}
        />
      </label>
      <label className={styles.label}>
        Dairy-Free
        <input
          type="checkbox"
          checked={dairyFree}
          onChange={() => setDairyFree(!dairyFree)}
        />
      </label>
      <Button className={styles.button} onClick={handleFilterChange}>
        Apply Filters
      </Button>
    </div>
  );
};

export default Filter;
