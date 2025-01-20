import React, { act, useCallback, useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import WelcomePack from "../../components/WelcomePack/WelcomePack";
import LastSeenCard from "../../components/LastSeenCard/LastSeenCard";
import DesignFirstStep from "../../components/DesignFirstStep/DesignFirstStep";
import { getImageGiftsUrl, getOneProduct, getAnotherColorProduct } from "../../shared/api";
import { useParams } from "react-router-dom";
import Icon from "../../components/Icon/Index";
import { useNavigate } from "react-router-dom";
import useStore from "../../shared/store";
import BreadCrumbs from "../../components/breadcrumbs/breadcrumbs";
import { Similar } from "../../components/Similar/similar";
import Description from "../../components/description/description";
import LazyImage from "../../components/LazyImage/lazyimage";
import OasisBrandingWidget from "../../components/DesignFirstStep/widgets/oasis";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/Modal/Modal";

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
  const [quantity, setQuantity] = useState(1);
  const { favorites, setFavoritesByAddingItem, removeFavorites, setLastseenByAddingItem } = useStore();
  const [activeFavorite, setActiveFavorite] = useState(false);
  const { activeCategory, setActiveCategory } = useStore();
  const [selectedColorProductId, setSelectedColorProductId] = useState();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { id } = useParams();
  useEffect(() => {
    getOneProduct(id).then((data) => {
      console.log(data);
      setData(data);
      setPreview(0);

      setLastseenByAddingItem(data.id);
    });
  }, [id]);

  // function openModal() {
  //   setModal(true);
  // }

  // function closeModal() {
  //   setModal(false);
  // }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  const redirect = useNavigate();

  const addCartSelected = () => {
    if (activeFavorite) {
      setActiveFavorite(false);
      removeFavorites(data.id);
    } else {
      setActiveFavorite(true);
      setFavoritesByAddingItem({ id: data.id });
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

  //добавление в массив breadcrumbs текущей категории
  useEffect(() => {
    if (crumbsData[crumbsData.length - 1].label !== 'Каталог') {
      crumbsData.pop();
    }
    crumbsData.push(
      {
        url: '',
        label: activeCategory.name,
      }
    );
  }, [activeCategory]);

  const onColorClick = (id) => {
    setSelectedColorProductId(id);

    getAnotherColorProduct(id, data.catalog).then((data) => {
      setData(data);
      setPreview(0);
    });
  }
  console.log(data);
  console.log(data && data.images_more && Array.isArray(data.images_more));
  return (
    <>
      {data && (
        <>
          <div className={styles.container}>
            <BreadCrumbs crumbs={crumbsData} />
            {/* <DesignSecondStep /> */}
            <div className={styles.card}>
              <div className={styles.card__content}>
                <div className={styles.card__img_block}>
                  <ul className={styles.card__img_list}>
                    {/* Тут проблема, что в data.images_more может попасть не массив а строка */}
                    {data && data.images_more && Array.isArray(data.images_more) ? data.images_more.map((item, index) => (
                      <li key={index} onClick={() => setPreview(index)} className={`${styles.card__img_list_element} ${index !== preview && styles.opacity}`}>
                        <LazyImage src={data.catalog === 'gifts' ? getImageGiftsUrl(item) : item} alt={data.name} />
                      </li>
                    )) : <li onClick={() => setPreview('123')} className={`${styles.card__img_list_element} ${'123' !== preview && styles.opacity}`}>
                      <LazyImage src={data.catalog === 'gifts' ? getImageGiftsUrl(data.images_more) : data.images_more} alt={data.name} />
                    </li>}
                  </ul>
                  <img
                    className={styles.card__img}
                    src={data.catalog === 'gifts' ? getImageGiftsUrl(data.images_more[preview]) : data.images_more[preview]}
                    alt={data.name}
                    onClick={() => setShow(true)}
                  />
                  {show && (
                    <div
                      className={styles.card__lightBox}
                      onClick={() => setShow(false)}
                    >
                      <img src={data.catalog === 'gifts' ? getImageGiftsUrl(data.images_more[preview]) : data.images_more[preview]} />
                    </div>
                  )}
                </div>
                <div className={styles.card__info}>
                  <button
                    className={`${styles.card__btn_selected} ${activeFavorite ? styles.active : ""}`}
                    onClick={addCartSelected}
                  >
                    <Icon id="#star" className={styles.star__icon} />
                  </button>
                  <div className={styles.card__info_top}>
                    <h5 className={styles.card__info_number}>
                      арт. {data.code}{" "}
                    </h5>
                    <h2 className={styles.card__info_title}>{data.name}</h2>
                    <div className={styles.card__info_fabric}>
                      <div className={styles.card__info_material}>
                        <span id={styles.card__info_material}>Материал:</span>
                        <span>{data.material || ''}</span>
                      </div>
                      {/*                     <div className={styles.card__info_material}>
                      <span id={styles.card__info_material}>
                        Материал:
                      </span>
                      <span>{data.material}</span>
                    </div> */}
                      <div className={styles.card__info_material}>
                        <span id={styles.card__info_material}>Цвет товара:</span>
                        <span>{data.color || ''}</span>
                      </div>
                      <div className={styles.card__info_material}>
                        <span id={styles.card__info_material}>
                          Размер товара:
                        </span>
                        <span>{data.size || ''}</span>
                      </div>
                      <button className={styles.card__info_btn}>Подробнее</button>
                    </div>
                    <div className={styles.card__img_block2}>
                      <ul className={styles.card__img_list}>
                        {/* Тут проблема, что в data.images_more может попасть не массив а строка */}
                        {data && data.images_more && Array.isArray(data.images_more) ? data.images_more.map((item, index) => (
                          <li key={index} onClick={() => setPreview(index)} className={`${styles.card__img_list_element} ${index !== preview && styles.opacity}`}>
                            <LazyImage src={data.catalog === 'gifts' ? getImageGiftsUrl(item) : item} alt={data.name} />
                          </li>
                        )) : <li onClick={() => setPreview('123')} className={`${styles.card__img_list_element} ${'123' !== preview && styles.opacity}`}>
                          <LazyImage src={data.catalog === 'gifts' ? getImageGiftsUrl(data.images_more) : data.images_more} alt={data.name} />
                        </li>}
                      </ul>
                      <img
                        className={styles.card__img}
                        src={data.catalog === 'gifts' ? getImageGiftsUrl(data.images_more[preview]) : data.images_more[preview]}
                        alt={data.name}
                        onClick={() => setShow(true)}
                      />
                      {show && (
                        <div
                          className={styles.card__lightBox}
                          onClick={() => setShow(false)}
                        >
                          <LazyImage src={data.catalog === 'gifts' ? getImageGiftsUrl(preview) : preview} alt={data.name} />
                        </div>
                      )}
                    </div>
                    <div className={styles.card__color}>
                      <h5 className={styles.card__info_number}>Цвет:</h5>
                      <div className={styles.card__color_btns}>
                        {data.colors && data.colors.map((item) => {
                          return <button
                            className={`${selectedColorProductId === item.product_id ?
                              styles.card__color_btn_selected :
                              styles.card__color_btn}`}
                            style={{ backgroundColor: item.color_hex }}
                            onClick={() => onColorClick(item.product_id)}
                            key={item.product_id}></button>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={styles.card__parameters}>
                    <div className={styles.card__price}>
                      {data.price} ₽<span>/ шт</span>
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
                        {/*                       <span>Мин. тираж: {data.total_stock} шт.</span> */}
                        <span> В наличии: ? шт.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Description data={data} />
            <Similar id={data.id} />
            <div className={styles.banner}>
              <WelcomePack />
            </div>
          </div>
          <Modal active={isModalOpen} setActive={openModal} setClose={closeModal}>
            <DesignFirstStep
              qty={quantity}
              selectedColorProductId={selectedColorProductId ? selectedColorProductId : data.id}
              closeModal={closeModal}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default ProductCard;
