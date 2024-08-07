import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import WelcomePack from "../../components/WelcomePack/WelcomePack";
import LastSeenCard from "../../components/LastSeenCard/LastSeenCard";
import DesignFirstStep from "../../components/DesignFirstStep/DesignFirstStep";
import { getOneProduct } from "../../shared/api";
import { Link, useParams } from "react-router-dom";
import Icon from "../../components/Icon/Index";
import { useNavigate } from "react-router-dom";
import DesignSecondStep from "../../components/DesignSecondStep/DesignSecondStep";
import useStore from "../../shared/store";
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";

const DEFAULT_QTY = 1;

const crumbsData = [
  {
    url: '/',
    label: 'Главная',
  },
  {
    url: "/catalog",
    label: 'Каталог',
  },
];

function ProductCard() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();
  const [quantity, setQuantity] = useState(0);
  const { favorites, setFavorites } = useStore();
  const { activeCategory, setActiveCategory } = useStore();

  let firstDesc;
  let lastDesc;
  let lengthDesc;
  const { id } = useParams();
  useEffect(() => {
    getOneProduct(id).then((data) => {
      setData(data);
      setPreview(0);
      data.images;
    });
  }, []);
  if (data) {
    lengthDesc = data.description.split(" ").length / 2;
    firstDesc = data.description.split(" ").slice(0, lengthDesc);
    lastDesc = data.description.split(" ").slice(lengthDesc);
  }
  function openModal() {
    setModal(true);
  }
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

  const redirect = useNavigate();

  const addCartSelected = () => {
    const newItem = {
      srcImage: preview,
      productNumber: data.article,
      productName: data.name,
      newPrice: data.discount_price,
      oldPrice: data.price,
      id,
    };
    setFavorites(newItem);
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

  const material =
    data?.attributes?.find((attr) => attr.name === "Материал товара")?.value ||
    "";
  const method =
    data?.attributes?.find((attr) => attr.name === "Метод нанесения")?.value ||
    "";
  const color =
    data?.attributes?.find((attr) => attr.name === "Цвет товара")?.value || "";
  const size =
    data?.attributes?.find((attr) => attr.name === "Размер")?.value || "";
  // console.log(data);

  //добавление в массив breadcrumbs текущей категории
  useEffect(() => {
    if (crumbsData[crumbsData.length - 1].label !== 'Каталог') {
      crumbsData.pop();
    }
    crumbsData.push(
      {
        url: '',
        label: activeCategory,
      }
    );
  }, [activeCategory]);

  return (
    <>
      {data && (
        <div className={styles.container}>
          <BreadCrumbs crumbs={crumbsData} />
          {/* <DesignSecondStep /> */}
          <div className={styles.card}>
            <div className={styles.card__content}>
              <div className={styles.card__img_block}>
                <ul className={styles.card__img_list}>
                  {data.images.map((item, i) => (
                    <li key={i} onClick={() => setPreview(i)} className={`${styles.card__img_list_element} ${i !== preview && styles.opacity}`}>
                      <img src={item.small} alt="" />
                    </li>
                  ))}
                </ul>
                <img
                  className={styles.card__img}
                  src={data.images[preview].big}
                  alt=""
                  onClick={() => setShow(true)}
                />
                {show && (
                  <div
                    className={styles.card__lightBox}
                    onClick={() => setShow(false)}
                  >
                    <img src={preview} />
                  </div>
                )}
              </div>
              <div className={styles.card__info}>
                <button
                  className={styles.card__btn_selected}
                  onClick={addCartSelected}
                >
                  <Icon id="#star" className={styles.star__icon} />
                </button>
                <div className={styles.card__info_top}>
                  <h5 className={styles.card__info_number}>
                    арт. {data.article}{" "}
                  </h5>
                  <h2 className={styles.card__info_title}>{data.name}</h2>
                  <div className={styles.card__info_fabric}>
                    <div className={styles.card__info_material}>
                      <span id={styles.card__info_material}>Материал:</span>
                      <span>{material}</span>
                    </div>
                    <div className={styles.card__info_material}>
                      <span id={styles.card__info_material}>
                        Метод нанесения:
                      </span>
                      <span>{method}</span>
                    </div>
                    <div className={styles.card__info_material}>
                      <span id={styles.card__info_material}>Цвет товара:</span>
                      <span>{color}</span>
                    </div>
                    <div className={styles.card__info_material}>
                      <span id={styles.card__info_material}>
                        Размер товара:
                      </span>
                      <span>{size}</span>
                    </div>
                    <button className={styles.card__info_btn}>Подробнее</button>
                  </div>
                  <div className={styles.card__img_block2}>
                    <ul className={styles.card__img_list}>
                      {data.images.map((item, i) => (
                        <li key={i} onClick={() => setPreview(i)} className={`${i !== preview && styles.opacity}`}>
                          <img src={item.small} alt="" />
                        </li>
                      ))}
                    </ul>
                    <img
                      className={styles.card__img}
                      src={data.images[preview].big}
                      alt=""
                      onClick={() => setShow(true)}
                    />
                    {show && (
                      <div
                        className={styles.card__lightBox}
                        onClick={() => setShow(false)}
                      >
                        <img src={preview} />
                      </div>
                    )}
                  </div>
                  <div className={styles.card__color}>
                    <h5 className={styles.card__info_number}>Цвет:</h5>
                    <div className={styles.card__color_btns}>
                      <button className={styles.card__color_btn}></button>
                      <button className={styles.card__color_btn}></button>
                      <button className={styles.card__color_btn}></button>
                    </div>
                  </div>
                </div>
                <div className={styles.card__parameters}>
                  <div className={styles.card__price}>
                    {data.discount_price} ₽<span>/ шт</span>
                  </div>
                  <div className={styles.card__btns}>
                    <div className={styles.card__btn_quantity}>
                      <button
                        className={styles.card__btn1_quantity}
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
                          className={styles.card__btn_quantity_input}
                        />
                      </span>
                      <button
                        className={styles.card__btn2_quantity}
                        id="increase"
                        onClick={increaseQuantity}
                      >
                        <Icon id="#plus" className={styles.plus__icon} />
                      </button>
                    </div>
                    <button
                      className={styles.card__btn_design}
                      onClick={openModal}
                    >
                      <Icon id="#design" className={styles.design__icon} />
                      Задизайнить
                    </button>
                    <button className={styles.card__btn_order}>
                      <Icon id="#order" className={styles.order__icon} />
                      Заказать образец
                    </button>
                  </div>
                  <div className={styles.card__notification}>
                    <p className={styles.card__correction}>
                      Цена указана без стоимости нанесения.
                    </p>
                    <div className={styles.card__information}>
                      <span>Мин. тираж: {data.total_stock} шт.</span>
                      <span> В наличии: {data.total_stock} шт.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card__description}>
              <nav className={styles.card__description_nav}>
                <button className={styles.card__description_btn}>
                  Описание товара
                </button>
                <button className={styles.card__description_btn}>Дизайн</button>
                <button className={styles.card__description_btn}>
                  Доставка
                </button>
                <button className={styles.card__description_btn}>Файлы</button>
              </nav>
              <div className={styles.card__description_text}>
                <p>{firstDesc && firstDesc.join(" ")}</p>
                <p>{lastDesc && lastDesc.join(" ")}</p>
              </div>
            </div>
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
          <div className={styles.banner}>
            <WelcomePack />
          </div>
        </div>
      )}
      {modal && (
        <DesignFirstStep
          img={data.images[0].big}
          // img={preview}
          idPriduct={data.id}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default ProductCard;
