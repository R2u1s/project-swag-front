import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartCard.module.css";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { useParams } from "react-router-dom";
import { getImageGiftsUrl, getOneProduct } from "../../shared/api";
import DesignFirstStep from "../DesignFirstStep/DesignFirstStep";

function CartCard({
  id,
  srcImage,
  productName,
  productNumber,
  productCost,
  qty,
  code,
  catalog
}) {

  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(true);

  const { removeCart,setCartQtyItem } = useStore();
  const [quantity, setQuantity] = useState(1);
  const redirect = useNavigate();

  // useEffect(() => {
  //   getOneProduct(id).then((data) => {
  //     setData(data);
  //     setPreview(data.images[0].big);
  //     data.images;
  //   });
  // }, []);

  const [currentProduct, setCurrentProduct] = useState({});
  const [productTotal, setProductTotal] = useState(0);

  useEffect(() => {
    setQuantity(qty);
  },[]);

  useEffect(() => {
    setProductTotal((quantity * productCost).toFixed(2));
  },[quantity]);

  const increaseQuantity = () => {
    const newQty = quantity+1;
    setQuantity(newQty);
    setCartQtyItem({id:id, qty:newQty});
  };

  const decreaseQuantity = () => {
    if (parseInt(quantity,10) > 0) {
      const newQty = quantity-1;
      setQuantity(newQty);
      setCartQtyItem({id:id, qty:newQty});
    }
  };
  
  const handleQuantityChange = (event) => {
    /*     const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
          setQuantity(value);
        } */
    setQuantity(parseInt(event.target.value));
    setProductTotal((parseInt(event.target.value) * productCost).toFixed(2));
    setCartQtyItem({id:id, qty:parseInt(event.target.value)});
  };

  const handleBlur = () => {
    if (quantity === '' || isNaN(quantity) || !/^[1-9]\d*$/.test(quantity)) {
      setQuantity(1);
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
          <img className={styles.card__img} src={catalog === 'gifts' ? getImageGiftsUrl(srcImage) : srcImage} alt="" />
          <div className={styles.card__content}>
            <div className={styles.card__top}>
              <div className={styles.card__text}>
                <h5 className={styles.card__number}>арт. {code}</h5>
                <h3 className={styles.card__name} onClick={() => {
                  redirect(`/catalog/${id}`);
                }}>{productName}</h3>
              </div>
              <button
                className={styles.card__btn_delete}
                onClick={() => {
                  //setShow(false);
                  removeCart(id);
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
                  <span>
                    <input 
                    type="number" 
                    value={quantity || 0} 
                    onChange={handleQuantityChange} 
                                              onBlur={handleBlur}
                    className={styles.card__circulation_quantity_input}/></span>
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
