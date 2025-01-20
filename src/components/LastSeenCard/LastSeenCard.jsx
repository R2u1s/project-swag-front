import React from "react";
import Icon from "../Icon/Index";
import styles from "./LastSeenCard.module.css";
import { useState } from "react";
import DesignFirstStep from "../DesignFirstStep/DesignFirstStep";
import { useNavigate } from "react-router-dom";
import LazyImage from "../LazyImage/lazyimage";

function Card({
  srcImage,
  productName,
  productNumber,
  newPrice,
  oldPrice,
  bgc,
  totalStock,
  id
}) {
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const redirect = useNavigate();

  function closeModal() {
    setModal(false);
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <>
      <div className={styles.card} onClick={() => {setModal(prev => prev);redirect(`/product/${id}`)}}>
        <div className={styles.card__btns}>
          <button className={styles.card__btn}>
            <Icon id="#cart" className={styles.cart__icon} />
          </button>
          <button className={styles.card__btn}>
            <Icon id="#star" className={styles.cart__icon} />
          </button>
        </div>
        <LazyImage extraClass={styles.card__img} src={srcImage} alt={productName} />
        <div className={styles.card__color}>
          <span
            className={styles.card__color}
            style={{ background: bgc }}
          ></span>
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
                    onChange={handleQuantityChange}
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
                onClick={() => setModal(true)}
              >
                <Icon id="#design" className={styles.design__icon} />
                Задизайнить
              </button>
            </div>
            <div className={styles.card__additionally_text}>
              Мин. тираж: <span>{totalStock} шт.</span>
            </div>
          </div>
        </div>
        {modal && (
          <DesignFirstStep
            img={srcImage}
            // id={id}
            closeModal={closeModal}
            // idPriduct={id}
          />
        )}
      </div>
    </>
  );
}

export default Card;
