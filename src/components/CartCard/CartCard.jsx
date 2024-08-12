import React, { useEffect, useState } from "react";
import styles from "./CartCard.module.css";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../shared/api";
import DesignFirstStep from "../DesignFirstStep/DesignFirstStep";

function CartCard({
  srcImage,
  productName,
  productNumber,
  productCost,
  qty
}) {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(true);

  const { removeCart } = useStore();

  // useEffect(() => {
  //   getOneProduct(id).then((data) => {
  //     setData(data);
  //     setPreview(data.images[0].big);
  //     data.images;
  //   });
  // }, []);

  
  const { cart, setCart } = useStore();
  const [currentProduct, setCurrentProduct] = useState({});
  const [productTotal, setProductTotal] = useState(0);

  useEffect(() => {
    setCurrentProduct(cart.find(item => item.productNumber === productNumber));
  }, [cart]);

  useEffect(() => {
    setProductTotal((currentProduct.quantity * currentProduct.productCost).toFixed(2));
  }, [currentProduct]);

  const increaseQuantity = () => {
    const newQty = currentProduct.quantity+1;
    setCurrentProduct({...currentProduct, quantity:newQty})
    setCart({...currentProduct, quantity:newQty});
  };

  const decreaseQuantity = () => {
    if (currentProduct.quantity > 0) {
      const newQty = currentProduct.quantity-1;
      setCurrentProduct({...currentProduct, quantity:newQty})
      setCart({...currentProduct, quantity:newQty});
    }
  };
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCurrentProduct({...currentProduct, quantity:value});
    }
  };

  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  return (
    <>
      {show && (
        <div className={styles.card}>
          <img className={styles.card__img} src={srcImage} alt="" />
          <div className={styles.card__content}>
            <div className={styles.card__top}>
              <div className={styles.card__text}>
                <h5 className={styles.card__number}>арт. {productNumber}</h5>
                <h3 className={styles.card__name}>{productName}</h3>
              </div>
              <button
                className={styles.card__btn_delete}
                onClick={() => {
                  setShow(false);
                  removeCart(productNumber);
                }}
              >
                <Icon id="#delete" className={styles.delete__icon} />
              </button>
            </div>
            <img className={styles.card__img2} src={srcImage} alt="" />
            <div className={styles.card__design}>
              <div className={styles.card__circulation}>
                <h5 className={styles.card__circulation_text}>Тираж:</h5>
                <div className={styles.card__circulation_quantity}>
                  <button
                    className={styles.card__circulation_btn}
                    id="decrease"
                    onClick={decreaseQuantity}
                  >
                    <Icon id="#minus" className={styles.minus__icon} />
                  </button>
                  <span><input type="number" value={currentProduct.quantity} onChange={handleQuantityChange} className={styles.card__circulation_quantity_input}/></span>
                  <button
                    className={styles.card__circulation_btn}
                    id="increase"
                    onClick={increaseQuantity}
                  >
                    <Icon id="#plus" className={styles.plus__icon} />
                  </button>
                </div>
              </div>
              <button className={styles.card__btn_change} onClick={openModal}>
                Изменить дизайн
              </button>
            </div>
            <div className={styles.card__bottom}>
              <div className={styles.card__cost}>
                Стоимость 1 шт.: {productCost} ₽
              </div>
              <div>Итого: {<p className={styles.card__total}>{productTotal} ₽</p>}</div>
              {/* <div className={styles.card__production }>Сроки изготовления: {productProduction}</div> */}
            </div>
          </div>
        </div>
      )}
      {modal && (
        <DesignFirstStep
          // img={data.images[0].big}
          // idPriduct={data.id}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default CartCard;
