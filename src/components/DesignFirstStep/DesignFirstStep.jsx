/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styles from "./DesignFirstStep.module.css";
import Loader from "../Loader/Loader";
import Icon from "../Icon/Index";
import ResizableRotatableImage from "../xz2/Index";
import { getOneProduct, getImageGiftsUrl, getAnotherColorProduct } from "../../shared/api";
import useStore from "../../shared/store";
import DesignSecondStep from "../DesignSecondStep/DesignSecondStep";

const DEFAULT_QTY = 1;
const DEFAULT_APPLICATION = "Не выбрано"

// eslint-disable-next-line react/prop-types
function DesignFirstStep({ qty, selectedColorProductId, closeModal }) {
  const { setCartByAddingItem, setSecond, second } = useStore();
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  // const { setSecond } = useStore();

  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  const [fileName, setFileName] = useState();
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [loadTime, setLoadTime] = useState(null);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(DEFAULT_APPLICATION);
  const [selectedColor, setSelectedColor] = useState(0);
  const [inStock, setInStock] = useState(0);
  useEffect(() => {
    console.log(selectedColorProductId);
    getOneProduct(selectedColorProductId).then((data) => {
      console.log(data);
      setData(data);
      setDiscountPrice(parseInt(data.price, 10));
      setInStock(100);
    });
  }, []);
  useEffect(() => {
    setQuantity(qty);
  }, []);
  const totalPrice = (quantity * discountPrice).toFixed(2);
  // const totalPrice = quantity * discountPrice;
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const startTime = new Date(); // Время начала загрузки
      setImageUrl(URL.createObjectURL(file));
      setFileName(file.name);
      setShow(true);
      const endTime = new Date();
      const timeDiff = endTime - startTime;
      setLoadTime(timeDiff);
      setSecond(true);
    }
  };

  useEffect(() => {
    setSelectedColor(selectedColorProductId ? selectedColorProductId : '');
  }, []);

  const onColorClick = (id) => {
    setSelectedColor(id);
    getAnotherColorProduct(id, data.catalog).then((data) => {
      setData(data);
    });
  }

  const onApplicationClick = (item) => {
    const newValue = item.name === selectedApplication ? DEFAULT_APPLICATION : item.name
    setSelectedApplication(newValue);
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
    /*     const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
          setQuantity(value);
        } */
    setQuantity(event.target.value);
  };

  const handleBlur = () => {
    if (quantity === '' || isNaN(quantity) || !/^[1-9]\d*$/.test(quantity)) {
      setQuantity(DEFAULT_QTY);
    }
  };

  const [progress, setProgres] = useState(0);
  const [showName, setShowName] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgres(progress + 1);
    }, loadTime);

    if (progress === 100) {
      clearTimeout(timeout);
      setShowName(false);
    }
  }, [progress]);

  return (
    <>
      {true && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.modal__top1}>
              <div className={styles.wrap}>
                {data && <img
                  className={styles.modal__img}
                  id={styles.modal__img1}
                  src={data.catalog === 'gifts' ? getImageGiftsUrl(data.images.big) : data.images.big}
                  alt={data.name}
                />}
                <div
                  className={styles.transform__img}
                // onChange={(e) => {
                //   console.log
                // }}
                >
                  <ResizableRotatableImage
                    img={imageUrl}
                  // background="http://s.a-5.ru/p/7f/f4/9a5b8e5147adcf3e.jpg"
                  // background={img}
                  />
                </div>
              </div>
              {/* <ImageColorPalette imageUrl={imageUrl} /> */}
              <div className={styles.modal__content}>
                <div className={styles.modal__top}>
                  <h2 className={styles.modal__title}>Дизайн</h2>
                  <button
                    className={styles.modal__btn_close}
                    onClick={closeModal}
                  >
                    <Icon id="#close" className={styles.close__icon} />
                  </button>
                </div>
                <div className={styles.wrap2}>
                  {data && <img
                    className={styles.modal__img}
                    id={styles.modal__img2}
                    src={data.catalog === 'gifts' ? getImageGiftsUrl(data.images.big) : data.images.big}
                    alt={data.name}
                  />}
                  <div className={styles.transform__img}>
                    <ResizableRotatableImage
                      img={imageUrl}
                    // background="http://s.a-5.ru/p/7f/f4/9a5b8e5147adcf3e.jpg"
                    // background={img}
                    />
                  </div>
                </div>
                <div className={styles.modal__settings}>
                  <div className={styles.modal__color}>
                    <h3 className={styles.modal__settings_title}>
                      1. Выберите цвет
                    </h3>
                    <div className={styles.modal__color_btns}>
                    {data && data.colors && data.colors.length > 0 && data.colors.map((item) => {
                        return <button
                          className={`${selectedColor === item.product_id ?
                            styles.modal__color_btn_selected :
                            styles.modal__color_btn}`}
                          style={{ backgroundColor: item.color_hex }}
                          onClick={() => onColorClick(item.product_id)}
                          key={item.product_id}></button>
                      })}
                    </div>
                  </div>
                  <div className={styles.modal__loading}>
                    <h3 className={styles.modal__settings_title}>
                      2. Загрузите изображение
                    </h3>
                    {!show ? (
                      <label className={styles.modal__loading_label}>
                        <span>
                          Выберите файл{" "}
                          <Icon
                            id="#loading"
                            className={styles.loading__icon}
                          />
                        </span>
                        <input
                          className={styles.modal__loading_input}
                          onChange={handleChange}
                          type="file"
                        />
                      </label>
                    ) : !showName ? (
                      <div
                        style={{
                          width: "100%",
                          height: "60px",
                          border: "1px solid #94C0D4",
                          position: "relative",
                          borderRadius: "92px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            textAlign: "center",
                            margin: "auto",
                            transition: "width 0.1s ease-in-out", // Анимация изменения ширины
                            borderRadius: "92px",
                            zIndex: 2,
                          }}
                        >
                          Файл: {fileName}
                        </span>
                        <span
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#94C0D4",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            textAlign: "center",
                            margin: "auto",
                            transition: "width 0.1s ease-in-out",
                            borderRadius: "92px",
                          }}
                        ></span>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "60px",
                          border: "1px solid #94C0D4",
                          position: "relative",
                          borderRadius: "92px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            textAlign: "center",
                            margin: "auto",
                            transition: "width 0.1s ease-in-out", // Анимация изменения ширины
                            borderRadius: "92px",
                            zIndex: 2,
                          }}
                        >
                          {`${progress}%`}
                        </span>
                        <span
                          style={{
                            width: `${progress}%`,
                            height: "100%",
                            backgroundColor: "#94C0D4",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            textAlign: "center",
                            margin: "auto",
                            transition: "width 0.1s ease-in-out", // Анимация изменения ширины
                            borderRadius: "92px",
                          }}
                        ></span>
                      </div>
                    )}
                    <p className={styles.modal__loading_warning}>
                      Максимальный размер файла 10 Мб . Загрузите файл EPS, AI,
                      SVG, JPG
                    </p>
                    <p className={styles.modal__loading_warning}>
                      (I) Вы можете прислать готовый дизайн или заказать дизайн
                      в нашей студии - при наведении
                    </p>
                  </div>
                  <div className={styles.modal__types}>
                    <h3 className={styles.modal__settings_title}>
                      3. Выберите тип нанесение
                    </h3>
                    <div className={styles.modal__types_btns}>
                      {data && data.print.map((item) => {
                        return <button className={`${item.name === selectedApplication ? styles.modal__types_btn_selected :
                          styles.modal__types_btn}`} onClick={() => onApplicationClick(item)} value={selectedApplication.name}>
                          {item.description}
                        </button>
                      })}

                    </div>
                  </div>
                  <div className={styles.modal__quantity}>
                    <h3 className={styles.modal__settings_title}>
                      4. Выберите количество
                    </h3>
                    <div className={styles.modal__quantity_cost}>
                      <div className={styles.modal__quantity_span}>
                        <button
                          className={styles.modal__quantity_btn}
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
                            onBlur={handleBlur}
                            className={styles.modal__quantity_input}
                          />
                        </span>
                        <button
                          className={styles.modal__quantity_btn}
                          id="increase"
                          onClick={increaseQuantity}
                        >
                          <Icon id="#plus" className={styles.plus__icon} />
                        </button>
                      </div>
                      <span className={styles.modal__quantity_icon}>
                        <Icon
                          id="#multiply"
                          className={styles.multiply__icon}
                        />
                      </span>
                      <h5 className={styles.modal__quantity_price}>
                        {discountPrice} ₽/<span> шт</span>
                      </h5>
                      <span className={styles.modal__quantity_icon}>
                        <Icon
                          id="#equality"
                          className={styles.equality__icon}
                        />
                      </span>
                      <h3 className={styles.modal__quantity_total}>
                        {totalPrice} ₽
                      </h3>
                    </div>
                    <div className={styles.modal__quantity_warning}>
                      <p className={styles.modal__quantity_warning_text}>
                        Цена указана без стоимости нанесения.
                      </p>
                      <div className={styles.modal__loading_warning}>
                        {/*                         <span>Мин. тираж: {inStock} шт.</span> */}
                        <span> В наличии: {'?'} шт.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.control}>
              <button
                className={styles.control__btn_deselect}
                onClick={closeModal}
              >
                Отменить
              </button>
              <button
                className={styles.control__btn_buy}
                onClick={() => {
                  closeModal();
                  setCartByAddingItem({id:data.id,qty:quantity});
                  // setCart(data);
                  // console.log(cart);
                }}
              >
                В корзину
              </button>
            </div>
          </div>
          {second && <DesignSecondStep srcImage={imageUrl} />}
        </div>
      )}
    </>
  );
}

export default DesignFirstStep;
