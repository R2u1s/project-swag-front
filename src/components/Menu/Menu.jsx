/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import styles from "./Menu.module.css";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { getCategoryProducts, getAllCategories } from "../../shared/api";
import { useNavigate } from "react-router-dom";

const menuRoot = document.getElementById("menu");

function Menu({
  menuVisible,
  onMouseEnter,
  onMouseLeave
}) {

  const location = useLocation();
  const redirect = useNavigate();
  const { setActiveCategory, page, setPage, setCategory, setSearch, setCategories } = useStore();
  const [gar, setGar] = useState([]);
  const [garDown, setGarDown] = useState([]);
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
  const handleMouseEnter = (arr) => {
    timer = setTimeout(() => {
      setGar(arr);
      setGarDown([]);
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setGar([]);
    onMouseLeave();
  };

  let timerDown = null;
  const handleMouseEnterDown = (arr) => {
    timer = setTimeout(() => {
      if (arr) {
        setGarDown(arr);
      }
    }, 100);
  };

  const handleMouseLeaveDown = () => {
    clearTimeout(timerDown);
    setGarDown([]);
  };

  const { setItems, setLoader, setCount } = useStore();

  const onCategoryClick = (data) => {
    setSearch(false);

    setLoader(true);
    getCategoryProducts(data.id, 1)
      .then((data) => {
        //console.log(data);
        setItems(data);
        setCount(data[0].total_count);
      })
      .finally(() => {
        setLoader(false);
      });
    setPage(1);
    setActiveCategory(data);

    //выполняем переход в catalog, если сейчас не в каталоге
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    /* if (lastSegment !== 'catalog') {
      redirect('/catalog', { replace: true });
    } */
    redirect(`/catalog?category=${data.id}&page=${page}`);
  }

  return ReactDOM.createPortal((
    <div
      className={`${styles.menu__overlay} ${menuVisible && styles.menu__overlay_visibility_active}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.menu}>
        <h2 className={styles.menu__title}>Каталог</h2>
        <div className={styles.menu__content} onMouseLeave={() => {
          handleMouseLeave();
          handleMouseLeaveDown();
        }}>
          <div className={styles.menu__sidebar}>
            <div className={styles.menu__category}
            >
              {catalog && catalog.length > 0 && catalog.map((data, i) => {
                return data.parent_id === '1' && <button
                  className={styles.menu__category_btn}
                  key={i}
                  /*                 onClick={() => handleGarClick(data.arr)} */
                  onClick={() => onCategoryClick(data)}
                  onMouseEnter={() => handleMouseEnter(data.child)}
                >
                  {data.name}
                  {data.child.length > 0 && <Icon id="#arrow" className={styles.arrow} />}
                </button>
              })}
            </div>
            {gar && gar.length > 0 && (
              <div className={styles.menu__category}
              >
                {gar.map((data, i) => (
                  <button
                    className={styles.menu__category_btn}
                    key={i}
                    onClick={() => onCategoryClick(data)}
                    onMouseEnter={() => handleMouseEnterDown(data.child)}
                  >
                    {data.name}
                    {data.child.length > 0 && (
                      <Icon id="#arrow" className={styles.arrow} />
                    )}
                  </button>
                ))}
              </div>
            )}
            {garDown && garDown.length > 0 && (
              <div className={styles.menu__category}
              >
                {garDown.map((data, i) => (
                  <button
                    className={styles.menu__category_btn}
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
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
      </div>
    </div>
  ), menuRoot)
}

export default Menu;
