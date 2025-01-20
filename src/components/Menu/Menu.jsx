/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import styles from "./Menu.module.css";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { getCategoryProducts, getAllCategories } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import { findCategoryPath } from "../../utils/utils";
import SvgIcon from "../../ui/svg-icon/svg-icon";

const menuRoot = document.getElementById("menu");

function Menu({
  isMenuOpen,
  closeMenu
}) {

  const location = useLocation();
  const redirect = useNavigate();
  const { setActiveCategory, page, setPage, setSearch, setCategories, categories, setItems, setLoader, setCount } = useStore();
  const [gar, setGar] = useState([]);
  const [garDown, setGarDown] = useState([]);
  const [shift, setShift] = useState(0);
  const [subShift, setSubShift] = useState(0);
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCatalog(data);
      setCategories(data);
    });
  }, []);

  //временная лажа для раскытия списков категорий, надо нормально сделать
  //нужно сделать отдельный компонент раскрывающегося списка
  let timer = null;
  const handleMouseEnter = (arr, index) => {

    timer = setTimeout(() => {
      setGar(arr);
      setGarDown([]);
      setShift(index);
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setGar([]);
    onMouseLeave();
  };

  let timerDown = null;
  const handleMouseEnterDown = (arr,index) => {

    timer = setTimeout(() => {
      if (arr) {
        setGarDown(arr);
        setSubShift(index);
      }
    }, 100);
  };

  const handleMouseLeaveDown = () => {
    clearTimeout(timerDown);
    setGarDown([]);
    setShift(0);
    setSubShift(0);
  };

  const onCategoryClick = (data) => {
    closeMenu();
    setSearch(false);
    setLoader(true);
    getCategoryProducts(data.id, 1)
      .then((data) => {
        setItems(data);
        setCount(data[0].total_count);
      })
      .finally(() => {
        setLoader(false);
      });
    setPage(1);
    setActiveCategory(data);

    const pathCategory = findCategoryPath(categories, data.id).reduce((acc, item) => { return acc + '/' + item.name_eng }, '');
    redirect(`/catalog${pathCategory}?page=1`);
  }
  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  }, []);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("keydown", escFunction);
    }
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [isMenuOpen]);

  return ReactDOM.createPortal((
    <>
      <div
        className={`${styles.menu__overlay} ${isMenuOpen && styles.menu__overlay_visibility_active}`}
        onClick={closeMenu}
      >
      </div>
      {isMenuOpen && <div className={styles.menu}>
        <div className={`${styles.menu__content} up`} onMouseLeave={() => {
          handleMouseLeave();
          handleMouseLeaveDown();
        }}>
          <div className={styles.menu__sidebar}>
            <div className={styles.menu__category}
            >
              {catalog && catalog.length > 0 && catalog.filter(item => item.parent_id === '1').map((data, i) => {
                return (
                  // <button
                  //   className={styles.menu__category_btn}
                  //   key={i}
                  //   /*                 onClick={() => handleGarClick(data.arr)} */
                  //   onClick={() => onCategoryClick(data)}
                  //   onMouseEnter={() => handleMouseEnter(data.child)}
                  // >
                  //   {data.name}
                  //   {data.child.length > 0 && <Icon id="#arrow" className={styles.arrow} />}
                  // </button>
                  <button
                    className={styles.menu__category_btn}
                    key={i}
                    /*                 onClick={() => handleGarClick(data.arr)} */
                    onClick={() => onCategoryClick(data)}
                    onMouseEnter={() => handleMouseEnter(data.child,i)}
                  >
                    <SvgIcon name={data.name_eng} />
                    {data.name}
                  </button>)
              })}
            </div>
            {gar && gar.length > 0 && (
              <div className={styles.menu__category}
              style={{ paddingTop:`${shift*34}px` }}
              >
                {gar.map((data, i) => (
                  <button
                    className={styles.menu__subcategory_btn}
                    key={i}
                    onClick={() => onCategoryClick(data)}
                    onMouseEnter={() => handleMouseEnterDown(data.child,i)}
                  >
                    {data.name}
{/*                     {data.child.length > 0 && (
                      <Icon id="#arrow" className={styles.arrow} />
                    )} */}
                  </button>
                ))}
              </div>
            )}
            {garDown && garDown.length > 0 && (
              <div className={styles.menu__category}
              style={{ paddingTop:`${(shift+subShift)*34}px` }}
              >
                {garDown.map((data, i) => (
                  <button
                    className={styles.menu__subcategory_btn}
                    onClick={() => onCategoryClick(data)}
                    key={i}
                  >
                    {data.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={styles.menu__banner}
          >
            <div className={styles.menu__banner_info}>
              <h3 className={styles.menu__banner_title}>
                Бесплатный Welcome pack
              </h3>
              <p className={styles.menu__banner_text}>
                Получите бесплатный образец Welcome pack к себе в офис.
              </p>
            </div>
            <button className={styles.menu__banner_btn}>Заказать</button>
          </div>
        </div>
      </div>}
    </>
  ), menuRoot)
}

export default Menu;
