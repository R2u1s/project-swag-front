import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Burger from "../Burger/Burger";
import Menu from "../Menu/Menu";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import Search from "../Search/Search";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";

function Header() {
  const { favorites,search,setSearch } = useStore();
  const { cart } = useStore();
  const [qtyCart, setQtyCart] = useState(0);
  const [qtyFav, setQtyFav] = useState(0);
  const [showSearch, setShowSearch] = useState(search);

  const { isModalOpen, openModal, closeModal } = useModal();

  const toggleShowSearch = () => {
    setShowSearch(prevShowSearch => !prevShowSearch);
  }

  useEffect(() => {
    //Определение количества товаров в корзине в store и localStorage
    if (!(cart.length > 0)) {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        setQtyCart(storedCart.length);
      }
    } else {
      setQtyCart(cart.length);
    }
    //Определение количества избранных товаров в store и localStorage

    if (!(favorites.length > 0)) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (storedFavorites) {
        setQtyFav(storedFavorites.length);
      }
    } else {
      setQtyFav(favorites.length);
    }
  }, [cart, favorites]);

  useEffect(()=>{
    setShowSearch(search);
  },[search]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.support}>
          <div className={styles.support__content}>
            <p className={styles.support__text}>Служба поддержки по России:</p>
            <a className={styles.support__link} href="tel:+8 (800) 838-33-33">
              <Icon id="#phone" className={styles.phone__icon} />8 (800)
              838-33-33
            </a>
          </div>
        </div>
        <header className={styles.header}>
          <Link to="/" className={styles.header__logo}>
            <img src="/images/logo1.svg" alt="" />
          </Link>
          <nav className={styles.header__nav}>
            <div className={styles.menu__link_overflow}>
              <Link to="/" className={styles.header__nav_link}>
                Наборы{" "}
                <Icon id="#arrowDown" className={styles.arrowDown__icon} />
              </Link>
            </div>
            <div className={styles.menu__link_overflow}>
              <button className={styles.header__nav_link}
              onClick={()=>{
                isModalOpen ? closeModal() : openModal()
              }}
              >
                Каталог{" "}
                <Icon id="#arrowDown" className={styles.arrowDown__icon} />
              </button>
              <Menu 
                isMenuOpen={isModalOpen}
                closeMenu={closeModal}
              />
            </div>
            <div className={styles.menu__link_overflow}>
              <Link to="/" className={styles.header__nav_link}>
                Услуги{" "}
                <Icon id="#arrowDown" className={styles.arrowDown__icon} />
              </Link>
            </div>
            <Link
              className={styles.header__nav_link}
              id={styles.header__nav_link}
            >
              О платформе
            </Link>
          </nav>
          <div className={styles.header__btns}>
            <Link to="/selected">
              <button className={styles.header__btn_favourites}>
                <Icon id="#star" className={styles.star__icon} />
                <span className={styles.header__btn_favourites_quantity}>
                  {qtyFav}
                </span>
              </button>
            </Link>
            <div className={styles.header__btn}>
              <button className={styles.header__btn_account}>
                <Icon id="#account" className={styles.account__icon} />
              </button>
              <button className={styles.header__btn_search} onClick={toggleShowSearch}>
                <Icon id="#search" className={styles.account__icon} />
              </button>
              <Link to="/cart">
                <button className={styles.header__btn_cart}>
                  <span className={styles.header__btn_favourites_quantity}>
                    {qtyCart}
                  </span>
                  <Icon id="#cart" className={styles.account__icon} />
                </button>
              </Link>
            </div>
          </div>
        </header>
      </div>
      <div className={styles.burger}>
        <Burger />
      </div>
      {showSearch && (
        <Search />
      )}
    </>
  );
}

export default Header;
