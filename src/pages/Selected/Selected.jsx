import React, { useState, useEffect } from "react";
import styles from "./Selected.module.css";
import SideBar from "../../components/SideBar/SideBar";
import Card from "../../components/Card/Card";
import Services from "../../components/Services/Services";
import Category from "../../components/Category/Category";
import { postLocalStorageId } from "../../shared/api";
import LastSeenCard from "../../components/LastSeenCard/LastSeenCard";
import Icon from "../../components/Icon/Index";
import { Link } from "react-router-dom";
import useStore from "../../shared/store";
import Filter from "../../components/Filter/Filter";
import Sorting from "../../components/Sorting/Sorting";
import { getGroupProducts } from "../../shared/api";

function Selected() {
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSorting, setShowSorting] = useState(false);
  const array = JSON.parse(localStorage.getItem("selected")) || [];
  const array2 = JSON.parse(localStorage.getItem("favorites")) || [];
  const { favorites, setFavorites } = useStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!(favorites.length > 0)) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (storedFavorites) {
        setFavorites(storedFavorites);
        getGroupProducts(storedFavorites.map(item => item.id)).then((data) => {
          setProducts(data);
        })
      }
    } else {
      getGroupProducts(favorites.map(item => item.id)).then((data) => {
        setProducts(data);
      })
    }
  }, []);

  const toggleShowFilter = () => {
    setShowFilter((prevShowsetShowFilter) => !prevShowsetShowFilter);
  };

  const toggleShowSorting = () => {
    setShowSorting((prevShowsetShowSorting) => !prevShowsetShowSorting);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.selected}>
          <div className={styles.sidebar}>
            <SideBar />
          </div>
          <div className={styles.selected__content}>
            <div className={styles.selected__top}>
              <div className={styles.selected__info}>
                <div className={styles.selected__breadcrumbs}>
                  <Link to="/" className={styles.selected__breadcrumbs}>
                    Главная
                  </Link>{" "}
                  <Icon id="#arrowRight" className={styles.arrowRight__icon} />{" "}
                  Избранные товары
                </div>
                <h1 className={styles.selected__title}>
                  Избранные товары <span>{products.length}</span>
                </h1>
                <p className={styles.selected__description}>
                  Сложно определиться или вы хотите что-то особенное? Напишите
                  нам - мы сделаем вам предложение, которое вам понравится.
                </p>
              </div>
              <div className={styles.selected__btns_control}>
                <div className={styles.selected__btns_tools}>
                  <div className={styles.selected__btns_filter}>
                    <button
                      className={styles.selected__btn_tools}
                      onClick={toggleShowFilter}
                    >
                      <Icon id="#filter" className={styles.filter__icon} />
                      <span>Фильтр</span>
                    </button>
                    {showFilter && <Filter />}
                  </div>
                  <div className={styles.selected__btns_sorting}>
                    <button
                      className={styles.selected__btn_tools}
                      onClick={toggleShowSorting}
                    >
                      <Icon id="#sorting" className={styles.sorting__icon} />
                      <span>Сортировка</span>
                    </button>
                    {showSorting && <Sorting />}
                  </div>
                </div>
                <div className={styles.selected__btns_grid}>
                  <button className={styles.selected__btn_grid}>
                    <Icon id="#grid1" className={styles.grid__icon} />
                  </button>
                  <button className={styles.selected__btn_grid}>
                    <Icon id="#grid2" className={styles.grid__icon} />
                  </button>
                </div>
              </div>
            </div>
            <ul className={styles.selected__cards}>
              {products && products.length > 0 ? (
                products.map((item) => (
                  <li key={item.id}>
                    <Card card={item} />
                  </li>
                ))
              ) : (
                <p>No selected items found.</p>
              )}
            </ul>
            <div className={styles.selected__pagination}>
              <button
                className={styles.selected__pagination_btn}
                id={styles.btn__prev}
              >
                Назад
              </button>
              <button className={styles.selected__pagination_btn}>1</button>
              <button className={styles.selected__pagination_btn}>2</button>
              <button className={styles.selected__pagination_btn}>3</button>
              <button className={styles.selected__pagination_btn}>...</button>
              <button className={styles.selected__pagination_btn}>13</button>
              <button className={styles.selected__pagination_btn}>14</button>
              <button className={styles.selected__pagination_btn}>15</button>
              <button
                className={styles.selected__pagination_btn}
                id={styles.btn__next}
              >
                Вперёд
              </button>
            </div>
          </div>
        </div>
        <div className={styles.seen}>
          <h2 className={styles.seen__title}>Вы смотрели</h2>
          <div className={styles.seen__content}>
            <LastSeenCard
              srcImage="./images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="./images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="./images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="./images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="./images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="./images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
          </div>
        </div>
        <div className={styles.services}>
          <Services />
        </div>
        <div className={styles.category}>
          <Category />
        </div>
      </div>
    </>
  );
}

export default Selected;
