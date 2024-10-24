import React, { useEffect, useState, useMemo } from "react";
import styles from "./Cart.module.css";
import WelcomePack from "../../components/WelcomePack/WelcomePack";
import LastSeenCard from "../../components/LastSeenCard/LastSeenCard";
import CartCard from "../../components/CartCard/CartCard";
import { Link } from "react-router-dom";
import { postLocalStorageId,getCartProducts } from "../../shared/api";
import Icon from "../../components/Icon/Index";
import useStore from "../../shared/store";
import { LastSeen } from "../../components/LastSeen/lastseen";

function Cart() {
  const [data, setData] = useState([]);

  const cart = useStore(state => state.cart);
  const setCart = useStore(state => state.setCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products,setProducts] = useState([]);

  useEffect(() => {
    if (!(cart.length > 0)) {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        setCart(storedCart);
        getCartProducts(storedCart.map(item => item.id)).then((data)=>{
          setProducts(data);
        })
      }
    } else {
      getCartProducts(cart.map(item => item.id)).then((data)=>{
        setProducts(data);
      })
    }
  }, []);

  useEffect(() => {
    setTotalPrice(products.reduce((total, item) => {
      return cart && cart.length > 0 ? (total + item.price * cart.find(elem => elem.id === item.id).qty) : 0;
    }, 0));
  }, [cart,products]);

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
              {products && cart && cart.length > 0 &&
                products.map((item) => {
                  return (
                    <CartCard
                      key={item.id}
                      id={item.id}
                      qty={cart.find(elem => elem.id === item.id).qty}
                      productName={item.fullname}
                      productCost={item.price}
                      srcImage={item.images.big}
                      code={item.code}
                      catalog={item.catalog}
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
              {/* <div className={styles.cart__sidebar_circulation}>
                <span>Тираж:</span>
                <span>240</span>
              </div> */}
              <div className={styles.cart__sidebar_total}>
                <span className={styles.cart__sidebar_total_itogo}>Итого:</span>
                <span className={styles.cart__sidebar_total_price}>{totalPrice.toFixed(2) > 0 ? totalPrice.toFixed(2) : 0} ₽</span>
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
        <LastSeen />
      </div>
    </>
  );
}

export default Cart;
