import { useState } from "react";
import styles from "./index.module.css";
// import SvgIcon from "../SvgSprites/Index";
import { categoryCatalog, categoryCatalogCount } from "../../shared/api";
import useStore from "../../shared/store";
import Icon from "../Icon/Index";

export default function DropDown({ categories, title }) {
  const [show, setShow] = useState(false);
  const { favorites, burger, setBurger } = useStore();

  const [showSubIndex, setShowSubIndex] = useState(-1); // Индекс элемента, для которого открыт список
  const { setItems, setLoader, setCount, setPage, setActiveCategory } =
    useStore();

  const handleItemClick = (elem, index) => {
    if (!elem.arr) {
      setLoader(true);
      categoryCatalog(elem.name, 0, 11)
        .then((data) => {
          setBurger(false);
          setItems(data);
        })
        .finally(() => {
          setLoader(false);
        });
      categoryCatalogCount(elem.name).then((data) => {
        setCount(data[0].count);
      });
      setActiveCategory(elem.name);
      setPage(1);
    } else {
      setShowSubIndex(index === showSubIndex ? -1 : index); // Закрываем/открываем текущий элемент
    }
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={`${styles.dropdown__btn} ${show && styles.active__btn}`}
        onClick={() => setShow(!show)}
      >
        {title}
        <Icon
          id="#arrow"
          className={`${show && styles.active} ${styles.dropdown__arrow}`}
        />
      </button>
      {show && (
        <>
          {categories &&
            categories.map((elem, i) => (
              <div key={i}>
                <button
                  onClick={() => handleItemClick(elem, i)}
                  className={styles.dropdown__btn}
                >
                  {elem.name}
                  {elem.arr && (
                    <Icon
                      id="#arrow"
                      className={`${showSubIndex === i && styles.active} ${
                        styles.dropdown__arrow
                      }`}
                    />
                  )}
                </button>
                {elem.arr && showSubIndex === i && (
                  <ul className={styles.dropdown__list}>
                    {elem.arr.map((data, j) => (
                      <li key={j}>
                        <button
                          onClick={() => {
                            setLoader(true);
                            categoryCatalog(data.name, 0, 11)
                              .then((data) => {
                                setItems(data);
                              })
                              .finally(() => {
                                setLoader(false);
                              });
                            setActiveCategory(data.name);
                          }}
                        >
                          {data.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
}
