import styles from "./SideBar.module.css";
import DropDown from "../DropDown/Index";
import useStore from "../../shared/store";
import { setCategoryLevels } from "../../utils/utils";

function SideBar() {

  const { categories, activeCategory } = useStore();

  return (
    <>
      <aside className={styles.sidebar}>
        {categories.length>0 && activeCategory.id &&
          <DropDown
            categories={setCategoryLevels(categories, activeCategory.id).child}
            data={setCategoryLevels(categories, activeCategory.id)}
          />}
      </aside>
    </>
  );
}

export default SideBar;
