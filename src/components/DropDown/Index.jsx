import { useState } from "react";
import styles from "./index.module.css";
// import SvgIcon from "../SvgSprites/Index";
import { categoryCatalog, categoryCatalogCount } from "../../shared/api";
import useStore from "../../shared/store";
import Icon from "../Icon/Index";
import { getCategoryProducts } from "../../shared/api";
import { getCategoriesWithLevelTrue } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function DropDown({ categories, data }) {
  console.log(categories);
  const redirect = useNavigate();
  const [show, setShow] = useState(true);
  const { favorites, burger, setBurger } = useStore();

  const [showSubIndex, setShowSubIndex] = useState(getCategoriesWithLevelTrue(categories)); // Массив id категорий, для которых надо раскрыть список
  const { setItems, setLoader, setCount, setPage, setActiveCategory, setSearch } =
    useStore();

  const onCategoryClick = (data) => {
    setSearch(false);
    setLoader(true);
    getCategoryProducts(data.id, 1)
      .then((res) => {
        setItems(res);
        setCount(res[0].total_count);
      })
      .finally(() => {
        setLoader(false);
      });
    setPage(1);
    setActiveCategory(data);
    redirect(`/catalog?category=${data.id}&page=1`);
  }

  //здесь совсем беда, куча повторяющегося кода как в компоненте Menu, всё надо приводить в порядок, к одному компоненту
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__flex}>
        <button
          className={`${styles.dropdown__btn} ${show && styles.active__btn}`}
          onClick={() => {
            onCategoryClick(data)
          }}
        >
          {data.name}
        </button>
        {data.child && data.child.length > 0 && <button
          onClick={() => {
            setShow(!show);
          }}>
          <Icon
            id="#arrow"
            className={`${show && styles.active} ${styles.dropdown__arrow}`}
          />
        </button>}
      </div>
      {show && (
        <>
          {categories &&
            categories.map((elem, i) => (
              <div key={elem.id}>
                <div className={styles.dropdown__flex}>
                  <button
                    onClick={() => onCategoryClick(elem)}
                    className={`${styles.dropdown__btn} ${show && styles.dropdown__btn_sub} ${elem.level && styles.active__btn}`}
                  >
                    {elem.name}
                  </button>
                  {elem.child && elem.child.length > 0 && (
                    <button onClick={() => {
                      showSubIndex.includes(elem.id) ? setShowSubIndex(prev => prev.filter(id => id !== elem.id)) : setShowSubIndex(prev => [...prev,elem.id]);
                    }}>
                      <Icon
                        id="#arrow"
                        className={`${showSubIndex && showSubIndex.includes(elem.id) && styles.active} ${styles.dropdown__arrow}`}
                      />
                    </button>
                  )}
                </div>
                {elem.child && elem.child.length > 0 && showSubIndex && showSubIndex.includes(elem.id) && (
                  <ul className={styles.dropdown__list}>
                    {elem.child.map((data, j) => {
                      return <li key={j}>
                        <button
                          onClick={() => onCategoryClick(data)}
                          className={`${styles.dropdown__btn} ${data.level && styles.active__btn}`}
                        >
                          {data.name}
                        </button>
                      </li>
                    })}
                  </ul>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
}
