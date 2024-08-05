import { useEffect, useState } from "react";
import styles from "./Catalog.module.css";
import SideBar from "../../components/SideBar/SideBar";
import Card from "../../components/Card/Card";
import Category from "../../components/Category/Category";
import Services from "../../components/Services/Services";
import LastSeenCard from "../../components/LastSeenCard/LastSeenCard";
import {
  categoryCatalog,
  filterProduct,
  getCatalog,
  getCountCatalog,
  searchProduct,
} from "../../shared/api";
import Filter from "../../components/Filter/Filter";
import Sorting from "../../components/Sorting/Sorting";
import Icon from "../../components/Icon/Index";
import { Link } from "react-router-dom";
import useStore from "../../shared/store";
import Loading from "../../components/Loading/Index";
import CustomPagination from "../../components/CustomPagination/Index";
import { Pagination } from "@mui/material";

function Catalog() {
  const {
    items,
    setItems,
    loader,
    setLoader,
    count,
    // page,
    setPage,
    activeCategory,
    search,
    searchName,
    setSearch,
    setFilter,
    filter,
    brandActive,
    offcetPrice,
    filterShow,
    setFilterShow,
  } = useStore();

  const [show, setShow] = useState(true);
  const [showSorting, setShowSorting] = useState(false);
  const [countAll, setCountAll] = useState();
  useEffect(() => {
    getCountCatalog().then((data) => setCountAll(data[0].count));
    setFilter(false);
    setSearch(false);
  }, []);

  const cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  const toggleShowSorting = () => {
    setShowSorting((prevShowsetShowSorting) => !prevShowsetShowSorting);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.catalog}>
          <div className={styles.sidebar}>
            <SideBar />
          </div>
          <div className={styles.catalog__content}>
            <div className={styles.catalog__top}>
              <div className={styles.catalog__info}>
                <div className={styles.catalog__breadcrumbs}>
                  <Link to="/" className={styles.catalog__breadcrumbs}>
                    Главная
                  </Link>{" "}
                  <Icon id="#arrowRight" className={styles.arrowRight__icon} />{" "}
                  Каталог
                </div>
                <h1 className={styles.catalog__title}>
                  Каталог <span>{countAll}</span>
                </h1>
                <p className={styles.catalog__description}>
                  Сложно определиться или вы хотите что-то особенное? Напишите
                  нам - мы сделаем вам предложение, которое вам понравится.
                </p>
              </div>
              <div className={styles.catalog__btns_control}>
                <div className={styles.catalog__btns_tools}>
                  <div className={styles.catalog__btns_filter}>
                    <button
                      className={styles.catalog__btn_tools}
                      onClick={() => setFilterShow(true)}
                    >
                      <Icon id="#filter" className={styles.filter__icon} />
                      <span>Фильтр</span>
                    </button>
                    {filterShow && <Filter />}
                  </div>
                  <div className={styles.catalog__btns_sorting}>
                    <button
                      className={styles.catalog__btn_tools}
                      onClick={toggleShowSorting}
                    >
                      <Icon id="#sorting" className={styles.sorting__icon} />
                      <span>Сортировка</span>
                    </button>
                    {showSorting && <Sorting />}
                  </div>
                </div>
                <div className={styles.catalog__btns_grid}>
                  <button className={styles.catalog__btn_grid}>
                    <Icon id="#grid1" className={styles.grid__icon} />
                  </button>
                  <button className={styles.catalog__btn_grid}>
                    <Icon id="#grid2" className={styles.grid__icon} />
                  </button>
                </div>
              </div>
              {show && (
                <div className={styles.catalog__banner}>
                  <button
                    className={styles.catalog__banner_close}
                    onClick={() => setShow(false)}
                  >
                    <Icon id="#close2" className={styles.close__icon} />
                  </button>
                  <div className={styles.catalog__banner_info}>
                    <h2 className={styles.catalog__banner_title}>
                      Бесплатный Welcome pack
                    </h2>
                    <p className={styles.catalog__banner_description}>
                      Получите бесплатный образец Welcome pack к себе в офис.
                    </p>
                  </div>
                  <button className={styles.catalog__banner_btn}>
                    Заказать
                  </button>
                </div>
              )}
            </div>
            <div className={styles.catalog__cards}>
              {loader && <Loading />}
              {items &&
                items.map((data, index) => {
                  return (
                    <Card
                      key={index}
                      srcImage={data.images[0].big}
                      productName={data.name}
                      productNumber={data.article}
                      newPrice={data.discount_price}
                      oldPrice={data.price}
                      bgc={["#000", "#fc0"]}
                      id={data.id}
                      categories={data.attributes}
                      totalStock={data.total_stock}
                      // quantity={0}
                    />
                  );
                })}
            </div>
            {count > 11 ? (
              <Pagination
                count={Math.ceil(count / 11)}
                shape="rounded"
                // page={+page}
                onClick={(e) => {
                  setLoader(true);
                  if (!search) {
                    categoryCatalog(
                      activeCategory,
                      +e.target.textContent * 11 - 11,
                      +e.target.textContent * 11
                    )
                      .then((data) => {
                        setItems(data);
                        setPage(e.target.textContent);
                      })
                      .finally(() => setLoader(false));
                  }
                  if (search) {
                    searchProduct(
                      +e.target.textContent * 11 - 11,
                      +e.target.textContent * 11,
                      searchName
                    )
                      .then((res) => {
                        setItems(res.data);
                      })
                      .finally(() => {
                        setLoader(false);
                      });
                  }
                  if (filter) {
                    filterProduct(
                      +e.target.textContent * 11 - 11,
                      +e.target.textContent * 11,
                      brandActive,
                      offcetPrice.start,
                      offcetPrice.end
                    )
                      .then((res) => {
                        setItems(res.rows);
                      })
                      .finally(() => {
                        setLoader(false);
                      });
                  }
                }}
              />
            ) : (
              <CustomPagination />
            )}
          </div>
        </div>
        <div className={styles.seen}>
          <div className={styles.seen__title}>Вы смотрели</div>
          <div className={styles.seen__content}>
            <LastSeenCard
              srcImage="/images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="/images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="/images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="/images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="/images/image 42.png"
              productName="Чайная пара с бамбуковым блюдцем «Sheffield»"
              productNumber="87145.06"
              newPrice="621 ₽"
              oldPrice="1 200 ₽"
              bgc="#000"
            />
            <LastSeenCard
              srcImage="/images/image 42.png"
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

export default Catalog;
