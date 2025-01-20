import { useState } from "react";
import styles from "./Search.module.css";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { searchProduct, searchProductCount } from "../../shared/api";
import { useNavigate } from "react-router-dom";

function Search() {
  const [value, setValue] = useState("");
  const {
    setItems,
    setCount,
    setLoader,
    setActiveSearch,
    setSearch,
    search,
    setSearchName,
  } = useStore();
  const redirect = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    setSearch(true);
    searchProduct(value, 1)
      .then((res) => {
        setItems(res);
        setSearchName(value);
      })
      .catch((res) => {
        console.log('catch' + res);
      })
      .finally(() => {
        setLoader(false);
      });
    // searchProductCount(value).then((res) => {
    //   setCount(res.count);
    // });
    setActiveSearch(value);
    redirect("/catalog");
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Поиск</h2>
        <form className={styles.search} onSubmit={handleSubmit}>
            <div className={styles.search__input_content}>
              <input
                className={styles.search__input}
                type="text"
                name=""
                id=""
                onChange={(e) => setValue(e.target.value)}
                placeholder="Название товара"
              // placeholder="Название товара, события, арктикул"
              />
              <Icon id="#search" className={styles.search__icon} />
            </div>
            <button
              type={'submit'}
              className={styles.search__btn}
            >
              Найти
            </button>
        </form>
      </div>
    </>
  );
}

export default Search;
