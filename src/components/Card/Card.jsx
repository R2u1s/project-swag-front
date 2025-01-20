import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import Icon from "../Icon/Index";
import DesignFirstStep from "../DesignFirstStep/DesignFirstStep";
import useStore from "../../shared/store";
import { getImageGiftsUrl } from "../../shared/api";
import LazyImage from "../LazyImage/lazyimage";

function Card({ card }) {

  const { cart, setCartByAddingItem, setFavoritesByAddingItem, favorites, removeFavorites, setFavorites } = useStore();
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeCart, setActiveCart] = useState(false);
  const [activeFavorite, setActiveFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(card.images.big);

  useEffect(() => {
    if (!(favorites.length > 0)) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (storedFavorites) {
        setFavorites(storedFavorites);
      }
    }
  }, []);

  useEffect(() => {
    const isFavorite = favorites.some((fav) => fav.id === card.id);
    const isCartAdded = cart.some((item) => item.id === card.id);
    setActiveFavorite(isFavorite);
    setActiveCart(isCartAdded);
  }, [favorites, card.id, cart]);

  const { removeCart } = useStore();

  const addCart = (event) => {
    event.stopPropagation();
    if (activeCart) {
      setActiveCart(false);
      removeCart(card.id);
    } else {
      setActiveCart(true);
      setCartByAddingItem({ id: card.id, qty: quantity });
    }
  };

  const redirect = useNavigate();

  function closeModal() {
    setModal(false);
  }

  const addCartSelected = (event) => {
    event.stopPropagation();
    if (activeFavorite) {
      setActiveFavorite(false);
      removeFavorites(card.id);
    } else {
      setActiveFavorite(true);
      setFavoritesByAddingItem({id:card.id});
    }
  };

  const increaseQuantity = (event) => {
    event.stopPropagation();
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (event) => {
    event.stopPropagation();
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    event.stopPropagation();
    /*     const value = parseInt(event.target.value, 10); */
    const value = event.target.value;
    setQuantity(value);
    /*     if (!isNaN(value) && value > 0) {
          
        } */
  };

  const handleBlur = () => {
    // Если значение пустое, устанавливаем значение по умолчанию
    if (quantity === '') {
      setQuantity(1);
    }
  };

  //чтобы картинка менялась при наведении на цвет в течение 0.2с, а не мгновенно
  let timer = null;

  const handleMouseEnter = (color) => {
    timer = setTimeout(() => setCurrentImage(color.color_image.big), 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
  };

  return (
    <>
      <div className={styles.card} onClick={() => redirect(`/product/${card.id}`)}>
        <div className={styles.card__btns}>
          <button
            className={`${styles.card__btn} ${activeCart ? styles.active : ""}`}
            onClick={addCart}
          >
            <Icon id="#cart" className={styles.star__icon} />
            <span className={styles.visibleSpan}>Отложить в корзину</span>
          </button>
          <button
            className={`${styles.card__btn} ${activeFavorite ? styles.active : ""}`}
            onClick={addCartSelected}
          >
            <Icon id="#star" className={styles.star__icon} />
            <span className={styles.visibleSpan}>Добавить в избранное</span>
          </button>
        </div>
        <div className={styles.card__img}>
          <LazyImage src={card.catalog === 'gifts' ? getImageGiftsUrl(currentImage) : currentImage} alt={card.name} />
        </div>
        <div className={styles.card__colors}>
          {card.colors &&
            card.colors.map((item) => {
              return (
                <span
                  key={item.product_id}
                  className={styles.card__color}
                  style={{ background: item.color_hex }}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                ></span>
              );
            })}
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__number}>арт. {card.code}</div>
          <div className={styles.card__name}>{card.name}</div>
          <div className={styles.card__price}>
            <span className={styles.card__newprice}>{card.price} ₽</span>
            <span className={styles.card__oldprice}>{card.price} ₽</span>
          </div>
          <div className={styles.card__additionally}>
            <div className={styles.card__additionally_btns}>
              <div className={styles.card__additionally_quantity}>
                <button
                  className={styles.card__quantity_btn}
                  id="decrease"
                  onClick={decreaseQuantity}
                >
                  <Icon id="#minus" className={styles.minus__icon} />
                </button>
                <span>
                  <input
                    type="number"
                    value={quantity || 0}
                    onChange={handleQuantityChange}
                    onBlur={handleBlur}
                    className={styles.card__additionally_quantity_input}
                  />
                </span>
                <button
                  className={styles.card__quantity_btn}
                  id="increase"
                  onClick={increaseQuantity}
                >
                  <Icon id="#plus" className={styles.plus__icon} />
                </button>
              </div>
              <button
                className={styles.card__additionally_design}
                onClick={(event) => {
                  event.stopPropagation();
                  setModal(true);
                }}
              >
                <Icon id="#design" className={styles.design__icon} />
                Задизайнить
              </button>
            </div>
            <div className={styles.card__additionally_text}>
              В наличии: <span>{'?'} шт.</span>
            </div>
          </div>
        </div>
        {modal && (
          <DesignFirstStep
            qty={quantity}
            selectedColorProductId={card.id}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
}

export default Card;
