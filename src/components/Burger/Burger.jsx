import React, { useEffect } from "react";
import styles from "./Burger.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import DropDown from "../DropDown/Index";
import { category } from "../Menu/Menu";

function Burger() {
  const { favorites, burger, setBurger } = useStore();
  const { cart } = useStore();
  // const [burger, setBurger] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    setBurger(false);
  }, [location.pathname]);

  const toggleCatalogMenu = () => {
    setShowCatalog((prevShowCatalog) => !prevShowCatalog);
    setActiveButton((prevActiveButton) => !prevActiveButton);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.support}>
          <a className={styles.support__link} href="tel:+8 (800) 838-33-33">
            <Icon id="#phone" className={styles.phone__icon2} />8 (800)
            838-33-33
          </a>
        </div>
        <header className={styles.header}>
          <Link to="/" className={styles.header__logo}>
            <img src="/images/logo2.svg" alt="" />
          </Link>
          <div className={styles.header__btns}>
            <Link to="/selected" className={styles.header__btn_favourites}>
              <span className={styles.header__btn_favourites_quantity}>
                {favorites.length}
              </span>
              <Icon id="#star" className={styles.star__icon} />
            </Link>
            <div className={styles.header__btn}>
              <Link to="/cart" className={styles.header__btn_cart}>
                <span className={styles.header__btn_favourites_quantity}>
                  {cart.length}
                </span>
                <Icon id="#cart" className={styles.cart__icon} />
              </Link>
              <button
                className={styles.header__btn_menu}
                onClick={() => setBurger(true)}
              >
                <img src="/images/menu.svg" alt="" />
              </button>
            </div>
          </div>
        </header>
        {burger && (
          <div className={styles.menu}>
            <div className={styles.menu__content}>
              <button
                className={styles.menu__btn}
                onClick={() => setBurger(false)}
              >
                <Icon id="#close" className={styles.close__icon} />
              </button>
              <div className={styles.menu__search}>
                <input
                  className={styles.menu__search_input}
                  type="text"
                  placeholder="Поиск"
                />
                <Icon id="#search" className={styles.search__icon} />
              </div>
              <div className={styles.menu__links}>
                <div className={styles.menu__select}>
                  <button className={styles.menu__select_btn}>
                    Наборы{" "}
                    <Icon id="#arrowDown" className={styles.arrowDown__icon} />
                  </button>
                </div>
                <div className={styles.menu__select}>
                  <button
                    className={`${styles.menu__select_btn} ${
                      activeButton ? styles.active : ""
                    }`}
                    onClick={toggleCatalogMenu}
                  >
                    Каталог{" "}
                    <Icon id="#arrowDown" className={styles.arrowDown__icon} />
                  </button>
                  {showCatalog && (
                    <div className={styles.menu__category}>
                      {category.map((data, i) => (
                        <DropDown
                          title={data.name}
                          categories={data.arr}
                          key={i}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.menu__select}>
                  <button className={styles.menu__select_btn}>
                    Услуги{" "}
                    <Icon id="#arrowDown" className={styles.arrowDown__icon} />
                  </button>
                </div>
                <div className={styles.menu__select}>
                  <Link to="/">
                    <button className={styles.menu__select_btn}>
                      О платформе
                    </button>
                  </Link>
                </div>
              </div>
              <div className={styles.menu__support}>
                <p className={styles.menu__support_text}>
                  Служба поддержки по России:
                </p>
                <a
                  className={styles.menu__support_link}
                  href="tel:+8 (800) 838-33-33"
                >
                  <Icon id="#phone" className={styles.phone__icon} />8 (800)
                  838-33-33
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Burger;
