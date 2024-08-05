import React from "react";
import styles from "./Category.module.css";
import useStore from "../../shared/store";
import { categoryCatalog, categoryCatalogCount } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Loading from "../Loading/Index";

function Category() {
  const { loader, setItems, setCount, setActiveCategory, setLoader, setPage } =
    useStore();
  const redirect = useNavigate();
  const request = (data) => {
    setLoader(true);
    categoryCatalog(data, 0, 11)
      .then((data) => {
        setItems(data);
      })
      .finally(() => {
        setLoader(false);
        redirect("/catalog");
      });
    categoryCatalogCount(data).then((data) => {
      setCount(data[0].count);
    });
    setPage(1);
    setActiveCategory(data.name);
  };
  return (
    <>
      <div className={styles.container}>
        {loader && <Loading />}
        <div className={styles.category}>
          <div className={styles.category__cards}>
            <div
              className={styles.category__card}
              onClick={() => request("Внешние аккумуляторы")}
              id={styles.category__card1}
            >
              <h4 className={styles.category__card_title}>IT аксессуары</h4>
              <div className={styles.category__card_img}></div>
            </div>
            <div
              className={styles.category__card}
              onClick={() => request("Для шопинга")}
              id={styles.category__card2}
            >
              <h4 className={styles.category__card_title}>Сумки</h4>
              <img
                className={styles.category__card_img}
                src="/images/bag.png"
                alt=""
              />
            </div>
          </div>
          <div className={styles.category__cards}>
            <div
              className={styles.category__card}
              id={styles.category__card3}
              onClick={() => request("Футболки")}
            >
              <h4 className={styles.category__card_title}>Одежда</h4>
              <img
                className={styles.category__card_img}
                src="/images/image 32.png"
                alt=""
              />
            </div>
            <div
              className={styles.category__card}
              id={styles.category__card4}
              onClick={() => request("Книги")}
            >
              <h4 className={styles.category__card_title}>Полиграфия</h4>
            </div>
          </div>
          <div className={styles.category__cards}>
            <div
              className={styles.category__card}
              id={styles.category__card5}
              onClick={() => request("Кружки")}
            >
              <h4 className={styles.category__card_title}>Кружки</h4>
              <img
                className={styles.category__card_img}
                src="/images/cups.png"
                alt=""
              />
            </div>
            <div
              className={styles.category__card}
              id={styles.category__card6}
              onClick={() => request("Датированные")}
            >
              <h4 className={styles.category__card_title}>Ежедневники</h4>
              <img
                className={styles.category__card_img}
                src="/images/books.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
