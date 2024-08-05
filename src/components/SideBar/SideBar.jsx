import styles from "./SideBar.module.css";
import DropDown from "../DropDown/Index";
import { category } from "../Menu/Menu";
function SideBar() {
  return (
    <>
      <aside className={styles.sidebar}>
        {category.map((data, i) => (
          <DropDown title={data.name} categories={data.arr} key={i} />
        ))}
      </aside>
    </>
  );
}

export default SideBar;
