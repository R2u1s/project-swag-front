import { useEffect, useState, useMemo } from "react";
import styles from "./Catalog.module.css";
import SideBar from "../../components/SideBar/SideBar";
import Card from "../../components/Card/Card";
import Category from "../../components/Category/Category";
import Services from "../../components/Services/Services";
import { LastSeen } from "../../components/LastSeen/lastseen";
import {
  filterProduct,
  getCountCatalog,
  searchProduct,
} from "../../shared/api";
import Filter from "../../components/Filter/Filter";
import Sorting from "../../components/Sorting/Sorting";
import Icon from "../../components/Icon/Index";
import useStore from "../../shared/store";
import Loading from "../../components/Loading/Index";
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import Pagination from '@mui/material/Pagination';
import { getCategoryProducts, getCategoryInfo } from "../../shared/api";
import { crumbsConvert, extractCategories, findCategoryId, findCategoryPath, scrollToTop } from "../../utils/utils";
import { useSearchParams, useLocation } from "react-router-dom";
import { PAGINATION } from "../../utils/constants";

const crumbsData = [
  {
    url: '/',
    label: 'Главная',
  },
  {
    url: "/catalog",
    label: 'Каталог',
  },
];

function Catalog() {
  const {
    categories,
    items,
    setItems,
    loader,
    setLoader,
    count,
    page,
    setPage,
    activeCategory,
    setActiveCategory,
    search,
    searchName,
    setSearch,
    setFilter,
    filter,
    brandActive,
    offcetPrice,
    filterShow,
    setFilterShow,
    lastseen
  } = useStore();


  const [show, setShow] = useState(true);
  const [pagePagination, setPagePagination] = useState(1);
  const [showSorting, setShowSorting] = useState(false);
  const [countAll, setCountAll] = useState();
  const [crumbs, setCrumbs] = useState(crumbsData);

  const [filterVisible, setFilterVisible] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const closeFilter = () => {
    setFilterVisible(false);
  }

  useEffect(() => {
    const categoryId = findCategoryId(categories, extractCategories(location.pathname));
    const page = parseInt(searchParams.get('page'), 10);

    if (categories.length > 0 && !search) {
      setLoader(true);
      getCategoryInfo(categoryId || '1')
        .then((data) => {
          setCrumbs([
            ...crumbsData,
            ...crumbsConvert(findCategoryPath(categories, categoryId))
          ]);
          setActiveCategory(data);
        })
        .catch(err => console.error(err));
      getCategoryProducts(categoryId || '1', page || '1')
        .then((data) => {
          console.log(data);
          setItems(data);
          setCountAll(data[0].total_count);
        })
        .catch(err => console.error(err))
        .finally(() => {
          setLoader(false);
        });
    }
    setPage(page);

    count === null && getCountCatalog().then((data) => setCountAll(data[0].count));
  }, [activeCategory.id, searchParams, location, categories]);

  useEffect(() => {
    setPagePagination(page);
  }, [page, location, searchParams])

  const handleChangePagination = (e, value) => {
    setLoader(true);
    setPage(value);
    setPagePagination(value);
    if (!search && activeCategory === '') {
      getCategoryProducts('1', e.target.textContent)
        .then((data) => {
          setItems(data);
          setLoader(false);
        })
        .finally(() => setLoader(false));
    } else {
      if (!search) {
        getCategoryProducts(activeCategory.id, e.target.textContent)
          .then((data) => {
            setItems(data);
            setLoader(false)
          })
          .finally(() => setLoader(false));
      }
    }

    if (search) {
      searchProduct(
        e.target.textContent,
        searchName
      )
        .then((res) => {
          setItems(res.data);
          setLoader(false)
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

    scrollToTop();

  }

  //добавление в массив breadcrumbs текущей категории
  // useEffect(() => {
  //   if (crumbsData[crumbsData.length - 1].label !== 'Каталог') {
  //     crumbsData.pop();
  //   }
  //   activeCategory.name && crumbsData.push(
  //     {
  //       url: '',
  //       label: activeCategory.name,
  //     }
  //   );
  // }, [activeCategory]);

  /*   const cart = [];
    localStorage.setItem("cart", JSON.stringify(cart)); */

  const toggleShowSorting = () => {
    setShowSorting((prevShowsetShowSorting) => !prevShowsetShowSorting);
  };

  
  const content = useMemo(
    () => {
      return <div className={styles.container}>
        <div className={styles.catalog}>
          <div className={styles.sidebar}>
            <SideBar />
          </div>
          <div className={styles.catalog__content}>
            {/* <Filter /> */}
            <div className={styles.catalog__top}>
              <div className={styles.catalog__info}>
                {!search && <BreadCrumbs crumbs={crumbs} />}
                <h1 className={styles.catalog__title}>
                  {!search && activeCategory.name}<span>{count || countAll}</span>
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
                      onClick={() => setFilterVisible(true)}
                    >
                      <Icon id="#filter" className={styles.filter__icon} />
                      <span>Фильтр</span>
                    </button>
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
              {items && !loader &&
                items.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      card={item}
                    // srcImage={data.images[0].big}
                    // productName={data.name}
                    // productNumber={data.article}
                    // newPrice={data.discount_price}
                    // oldPrice={data.price}
                    // id={data.id}
                    // categories={data.attributes}
                    // totalStock={data.total_stock}
                    // attributes={data.attributes}
                    // quantity={0}
                    />
                  );
                })}
            </div>
            {
              <Pagination
                count={Math.ceil((activeCategory.name === '' ? countAll : count) / PAGINATION)}
                shape="rounded"
                // page={+page}
                siblingCount={3}
                page={pagePagination || 1}
                onChange={handleChangePagination}
              />
            }
          </div>
        </div>
        <LastSeen />
        <div className={styles.services}>
          <Services />
        </div>
        <div className={styles.category}>
          <Category />
        </div>
      </div>
    },
    [items, loader, activeCategory, search, filterVisible]
  );

  return (
    <>
      {content}
      <Filter
        filterVisible={filterVisible}
        closeFilter={closeFilter}
      />
    </>
  );
}

export default Catalog;
