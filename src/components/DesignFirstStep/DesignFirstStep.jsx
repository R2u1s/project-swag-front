/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styles from "./DesignFirstStep.module.css";
import Loader from "../Loader/Loader";
import Icon from "../Icon/Index";
import ResizableRotatableImage from "../xz2/Index";
import { getOneProduct } from "../../shared/api";
import useStore from "../../shared/store";
import DesignSecondStep from "../DesignSecondStep/DesignSecondStep";
import { findColorHex, parseAttributes } from "../../utils/utils";

const DEFAULT_QTY = 1;
const DEFAULT_APPLICATION = "Не выбрано"
const APPLICATION_TYPE_PADPRINTING = 'Тампопечат';
const APPLICATION_TYPE_UVPRINTING = 'УФ печать';
const APPLICATION_TYPE_LAMINATION = 'Ламинаци';


// eslint-disable-next-line react/prop-types
function DesignFirstStep({ closeModal, img, id, idPriduct }) {
  const { setCart, setSecond, second } = useStore();
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
  const [application, setApplication] = useState(DEFAULT_APPLICATION);
  const [selectedColor, setSelectedColor] = useState('');
  const [inStock, setInStock] = useState(0);
  useEffect(() => {
    getOneProduct(idPriduct).then((data) => {
      setData(data);
      setDiscountPrice(data.discount_price);
      setInStock(data.total_stock);
    });
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

  const onApplicationClick = (event) => {
    const value = event.target.value;
    setApplication(prev => {
      return prev === value ? DEFAULT_APPLICATION : value
    })
  }

  const onColorClick = (color) => {
    setSelectedColor(prev => {
      return prev === color ? '' : color
    })
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

  //массив цветов товара
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (data) {
      if (data.attributes) {
        setColors(parseAttributes(data.attributes));
      }
    }
  }, [data]);

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
                <img
                  className={styles.modal__img}
                  id={styles.modal__img1}
                  src={img}
                  alt=""
                />
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
                  <img
                    className={styles.modal__img}
                    id={styles.modal__img2}
                    src={img}
                    alt=""
                  />
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
                      {colors.map((item) => {
                        const currentColor = findColorHex(item.color);
                        return <button
                          className={`${selectedColor === currentColor ? 
                            styles.modal__color_btn_selected :
                            styles.modal__color_btn}`}
                          style={{ backgroundColor: currentColor }}
                          key={item.code}
                          onClick={()=>onColorClick(currentColor)}>
                        </button>
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
                      <button className={`${application === APPLICATION_TYPE_PADPRINTING ? styles.modal__types_btn_selected :
                        styles.modal__types_btn}`} onClick={onApplicationClick} value={APPLICATION_TYPE_PADPRINTING}>
                        {APPLICATION_TYPE_PADPRINTING}
                      </button>
                      <button className={`${application === APPLICATION_TYPE_UVPRINTING ? styles.modal__types_btn_selected :
                        styles.modal__types_btn}`} onClick={onApplicationClick} value={APPLICATION_TYPE_UVPRINTING}>
                        {APPLICATION_TYPE_UVPRINTING}
                      </button>
                      <button className={`${application === APPLICATION_TYPE_LAMINATION ? styles.modal__types_btn_selected :
                        styles.modal__types_btn}`} onClick={onApplicationClick} value={APPLICATION_TYPE_LAMINATION}>
                        {APPLICATION_TYPE_LAMINATION}
                      </button>
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
                        <span>Мин. тираж: {inStock} шт.</span>
                        <span> В наличии: {inStock} шт.</span>
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
                  const newItem = {
                    productNumber: data.id,
                    productName: data.name,
                    productCost: data.price,
                    srcImage: data.images[0].big,
                    quantity,
                  };
                  closeModal();

                  setCart(newItem);
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
