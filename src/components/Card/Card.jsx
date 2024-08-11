import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import Icon from "../Icon/Index";
import DesignFirstStep from "../DesignFirstStep/DesignFirstStep";
import useStore from "../../shared/store";
import { findColorHex, parseAttributes } from "../../utils/utils";

function Card({
  srcImage,
  productName,
  productNumber,
  newPrice,
  oldPrice,
  categories,
  id,
  totalStock,
  attributes
}) {
  const { cart, setCart, setFavorites, favorites } = useStore();
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeCart, setActiveCart] = useState(false);
  const [activeFavorite, setActiveFavorite] = useState(false);

  useEffect(() => {
    const isFavorite = favorites.some((fav) => fav.id === id);
    setActiveFavorite(isFavorite);
  }, [favorites, id]);

  const addCart = () => {
    const newItem = {
      productNumber,
      productName,
      productCost: newPrice,
      srcImage,
      quantity,
      totalStock,
    };

    setCart(newItem);
    setActiveCart(true);
    if (activeCart) {
      setActiveCart(false);
    }
  };

  const redirect = useNavigate();

  function closeModal() {
    setModal(false);
  }

  const addCartSelected = () => {
    const newItem = {
      srcImage,
      productName,
      productNumber,
      newPrice,
      oldPrice,
      quantity,
      id,
    };
    setFavorites(newItem);
    setActiveFavorite(true);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
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

  //массив цветов товара
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (attributes) {
      setColors(parseAttributes(attributes));
    }
  }, [attributes]);


  return (
    <>
      <div className={styles.card}>
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
        <div
          className={styles.card__img}
          onClick={() => redirect(`/catalog/${id}/${quantity}`)}
        >
          <img src={srcImage} alt="" />
        </div>
        <div className={styles.card__colors}>
          {colors &&
            colors.map((data, index) => {
              return (
                <span
                  key={index}
                  className={styles.card__color}
                  style={{ background: findColorHex(data.color) }}
                ></span>
              );
            })}
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__number}>арт. {productNumber}</div>
          <div className={styles.card__name}>{productName}</div>
          <div className={styles.card__price}>
            <span className={styles.card__newprice}>{newPrice}</span>
            <span className={styles.card__oldprice}>{oldPrice}</span>
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
                    value={quantity}
                    defaultValue={1}
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
                onClick={() => {
                  setModal(true);
                }}
              >
                <Icon id="#design" className={styles.design__icon} />
                Задизайнить
              </button>
            </div>
            <div className={styles.card__additionally_text}>
              В наличии: <span>{totalStock} шт.</span>
            </div>
          </div>
        </div>
        {modal && (
          <DesignFirstStep
            img={srcImage}
            // id={id}
            closeModal={closeModal}
            idPriduct={id}
          />
        )}
      </div>
    </>
  );
}

export default Card;
