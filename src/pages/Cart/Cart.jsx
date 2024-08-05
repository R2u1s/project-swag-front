import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import WelcomePack from "../../components/WelcomePack/WelcomePack";
import LastSeenCard from "../../components/LastSeenCard/LastSeenCard";
import CartCard from "../../components/CartCard/CartCard";
import { Link } from "react-router-dom";
import { postLocalStorageId } from "../../shared/api";
import Icon from "../../components/Icon/Index";
import useStore from "../../shared/store";

function Cart() {
  const [data, setData] = useState([]);
  const array = JSON.parse(localStorage.getItem("cart")) || [];

  // useEffect(() => {
  //   postLocalStorageId(array).then((data) => {
  //     setData(data);
  //   });
  // }, []);

  const { cart, setCart } = useStore();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cart}>
          <div className={styles.cart__content}>
            <h1 className={styles.cart__title} id={styles.cart__title1}>
              Корзина{" "}
              <span>
                {cart.length} товара{" "}
                <Icon id="#delete" className={styles.cart__icon} />
              </span>
            </h1>
            <div className={styles.cart__cards}>
              {cart &&
                cart.map((item, i) => {
                  return (
                    <CartCard
                      key={i}
                      quantity={item.quantity}
                      productNumber={item.productNumber}
                      productName={item.productName}
                      productCost={item.productCost}
                      srcImage={item.srcImage}
                    />
                  );
                })}
            </div>
            <Link to="/catalog" className={styles.cart__btn}>
              Продолжить покупки
            </Link>
          </div>
          <aside className={styles.cart__sidebar}>
            <h4 className={styles.cart__sidebar_title}>Ваш заказ</h4>
            <div className={styles.cart__sidebar_info}>
              <div className={styles.cart__sidebar_product}>
                <span>Товаров:</span>
                <span>{cart.length}</span>
              </div>
              <div className={styles.cart__sidebar_circulation}>
                <span>Тираж:</span>
                <span>240</span>
              </div>
            </div>
            <p className={styles.cart__sidebar_warning}>
              Цена указана без стоимости нанесения.
            </p>
            <div className={styles.cart__sidebar_bottom}>
              <Link to="/registration">
                <button
                  className={styles.cart__sidebar_btn}
                  id={styles.cart__sidebar_btn}
                >
                  Оформить заказ
                </button>
              </Link>
              <p className={styles.cart__sidebar_notification}>
                Обратите внимание: вы задизайнили не все товары добавленные в
                корзину. Товары без дизайна не будут оформлены.
              </p>
            </div>
          </aside>
          <h1 className={styles.cart__title} id={styles.cart__title2}>
            Корзина{" "}
            <span>
              {data.length} товара <img src="/images/cart_icon.svg" alt="" />
            </span>
          </h1>
        </div>
        <Link to="/registration">
          <button
            className={styles.cart__sidebar_btn}
            id={styles.cart__sidebar_btn2}
          >
            Оформить заказ
          </button>
        </Link>
        <div className={styles.banner}>
          <WelcomePack />
        </div>
        <div className={styles.similar}>
          <div className={styles.similar__info}>
            <h2 className={styles.similar__title}>Похожие товары</h2>
            <p className={styles.similar__text}>
              Посмотрите что мы для вас подобрали.
            </p>
          </div>
          <div className={styles.similar__content}>
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
      </div>
    </>
  );
}

export default Cart;
