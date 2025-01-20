import { useState, useEffect } from 'react';
import styles from "./SideBar.module.css";
import DropDown from "../DropDown/Index";
import useStore from "../../shared/store";
import { setCategoryLevels } from "../../utils/utils";
import { HEIGHT_HEADER } from "../../utils/constants";



function SideBar() {

  const { categories, activeCategory } = useStore();

  //боковое меню должно скроллиться вместе со страницей до тех пор, пока хэдер не скроется
  const [menuOffset, setMenuOffset] = useState(HEIGHT_HEADER);
  const [isFixed, setIsFixed] = useState(true);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset < 3500) {
      setMenuOffset(Math.max(HEIGHT_HEADER - offset, 0));
      setIsFixed(true);
    } else {
      setMenuOffset(0); // Меню фиксируется у верхней части экрана
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <aside className={styles.sidebar} style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: isFixed ? `${menuOffset}px` : '3500px',
      }}>
        {/* {categories.length > 0 && activeCategory.id && setCategoryLevels(categories, activeCategory.id).map((item) => {
          return <DropDown data={item} />
        })
        } */}
        {(categories && categories.length > 0 && activeCategory.id) && activeCategory.id === '1' ?
          categories.map((item) => {return item.parent_id === '1' && <DropDown data={setCategoryLevels(categories, item.id, false)} /> }) :
          <DropDown data={setCategoryLevels(categories, activeCategory.id, true)} />}
      </aside>
    </>
  );
}

export default SideBar;
