/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from "react";
import styles from "./DesignFirstStep.module.css";
import Loader from "../Loader/Loader";
import Icon from "../Icon/Index";
import ResizableRotatableImage from "../xz2/Index";
import { getOneProduct, getImageGiftsUrl, getAnotherColorProduct } from "../../shared/api";
import useStore from "../../shared/store";
import DesignSecondStep from "../DesignSecondStep/DesignSecondStep";
import OasisBrandingWidget from "./widgets/oasis";
import { ButtonDesign } from "../../ui/button-design/index";
import { Typography, Box, Button, List, ListItem, IconButton, Input } from "@mui/material";
import AddLinkIcon from '@mui/icons-material/AddLink';
import CloseIcon from '@mui/icons-material/Close';
import EqualIcon from '@mui/icons-material/DragHandle';
import { Remove as RemoveIcon, Add as AddIcon, Print } from '@mui/icons-material';
import LazyImage from "../LazyImage/lazyimage";
import { PrintOptionsComponent} from "./Print";
import {getPrintOptions} from "./api/index";


const DEFAULT_QTY = 1;
const DEFAULT_APPLICATION = "Не выбрано";
const DEFAULT_COLOR = undefined;

// eslint-disable-next-line react/prop-types
function DesignFirstStep({ qty, selectedColorProductId, closeModal }) {
  const { setCartByAddingItem, setSecond, second } = useStore();
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  // const { setSecond } = useStore();

  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [colors, setColors] = useState([]);
  const [fileName, setFileName] = useState();
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState();
  const [discountPrice, setDiscountPrice] = useState(0);
  const [loadTime, setLoadTime] = useState(null);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(DEFAULT_APPLICATION);
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);
  const [inStock, setInStock] = useState(0);

  useEffect(() => {
    setQuantity(qty);
    getOneProduct(selectedColorProductId).then((data) => {
      setData(data);
      setColors(data.colors);
      setDiscountPrice(parseInt(data.price, 10));
      setInStock(100);
    });
    (async () => {
      try {
        await getPrintOptions(selectedColorProductId);
      } catch (err) {
        console.log(err);
      }
    })();
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

  const handleAddPhoto = useCallback(
    async (event) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const newPhoto = {
          url: URL.createObjectURL(file),
        };
        setImageUrl(newPhoto.url);
      }
    },
    []
  );

  const onColorClick = (id) => {
    setSelectedColor(id);
    getAnotherColorProduct(id, data.catalog).then((res) => {
      setData(res);
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
                  <Box className={styles.modal__loading}>
                    <Typography
                      variant="button"
                      sx={{
                        marginBottom: "20px",
                        textTransform: 'none'
                      }}
                      className="text_size_medium text_color_black text_weight_bold">
                      1. Выберите цвет
                    </Typography>
                    <List className={styles.modal__color_btns} sx={{ marginBottom: "20px", padding: 0 }}>
                      {colors && colors.length > 0 && colors.map((item) => {
                        const isSelected = selectedColor === item.product_id;
                        return (
                          <ListItem
                            className={styles.modal__color_btn}
                            sx={{
                              backgroundColor: item.color_hex,
                              padding: 0,
                              border: item.color_hex === '#FFFFFF' ? '2px solid #C0C0C0' : 'none',
                              transform: isSelected ? 'scale(1.2)' : undefined,
                              opacity: selectedColor && !isSelected ? 0.5 : 1,
                              zIndex: isSelected ? 1 : 0
                            }}
                            onClick={() => onColorClick(item.product_id)}
                            key={item.product_id}>
                          </ListItem>
                        )
                      })}
                    </List>
                  </Box>

                  <Box className={styles.modal__loading} sx={{ paddingBottom: "20px" }}>
                    <Typography
                      variant="button"
                      sx={{
                        marginBottom: "12px",
                        textTransform: 'none'
                      }}
                      className="text_size_medium text_color_black text_weight_bold">
                      2. Загрузите изображение
                    </Typography>
                    {/* <ButtonDesign>
                      <Typography
                        variant="button"
                        sx={{
                          textTransform: 'none'
                        }}
                        className="text_size_medium text_color_primary text_weight_semibold">
                        Выберите файл
                      </Typography>
                      <Icon
                        id="#loading"
                        className={styles.loading__icon}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                      />
                    </ButtonDesign> */}
                    <Button
                      variant="button"
                      component="label"
                      className={styles["designfirststep__button"]}
                    >
                      <Typography
                        variant="button"
                        sx={{
                          textTransform: 'none'
                        }}
                        className="text_size_medium text_color_primary text_weight_semibold">
                        Выберите файл
                      </Typography>
                      <Icon
                        id="#loading"
                        className={styles.loading__icon}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAddPhoto}
                        hidden
                      />
                    </Button>
                    {imageUrl && <div className={styles["designfirststep__photo-container"]}>
                      <LazyImage src={imageUrl} className={styles["designfirststep__photo"]} alt={""} />
                    </div>}
                    <Typography className={"text_size_small text_color_hint text_weight_regular"} sx={{ marginBottom: "4px" }}>
                      Максимальный размер файла 10 Мб . Загрузите файл EPS, AI,
                      SVG, JPG
                    </Typography>
                    <Typography className={"text_size_small text_color_hint text_weight_regular"}>
                      (I) Вы можете прислать готовый дизайн или заказать дизайн
                      в нашей студии - при наведении
                    </Typography>
                  </Box>
                  <Box className={styles.modal__loading} sx={{ paddingBottom: "12px" }}>
                    <Typography
                      variant="button"
                      sx={{
                        marginBottom: "12px",
                        textTransform: 'none'
                      }}
                      className="text_size_medium text_color_black text_weight_bold">
                      3. Выберите тип нанесения
                    </Typography>
                    <PrintOptionsComponent />
                  </Box>
                  <Box className={styles.modal__loading} sx={{ paddingBottom: "28px", borderBottom: "none" }}>
                    <Typography
                      variant="button"
                      sx={{
                        marginBottom: "20px",
                        textTransform: 'none'
                      }}
                      className="text_size_medium text_color_black text_weight_bold">
                      4. Выберите количество
                    </Typography>
                    <Box className={styles.modal__quantity_cost}
                      sx={{
                        marginBottom: "20px"
                      }}>
                      <Box className={styles.modal__quantity_span}>
                        <IconButton className={styles.modal__quantity_btn} onClick={decreaseQuantity}>
                          <RemoveIcon className={styles.minus__icon} />
                        </IconButton>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          onBlur={handleBlur}
                          disableUnderline
                          className={`${styles.modal__quantity_input} text_size_medium text_color_black text_weight_medium`}
                          inputProps={{
                            style: { textAlign: 'center' },
                          }}
                        />
                        <IconButton className={styles.modal__quantity_btn} onClick={increaseQuantity}>
                          <AddIcon className={styles.plus__icon} />
                        </IconButton>
                      </Box>
                      <CloseIcon style={{ color: "var(--color-primary)" }} />
                      <Typography variant="h6" className={`${styles.modal__quantity_price} text_size_medium text_color_black text_weight_medium`}>
                        {discountPrice} ₽/<span> шт</span>
                      </Typography>
                      <div className={styles.equality__icon}>=</div>
                      <Typography variant="h5" className={`${styles.modal__quantity_total} text_size_large text_color_black text_weight_bold`}>
                        {totalPrice} ₽
                      </Typography>
                    </Box>
                    <Box>
                      <Typography className={`text_size_small text_color_black text_weight_regular`} sx={{ marginBottom: "8px" }}>
                        Цена указана без стоимости нанесения.
                      </Typography>
                      <Typography className={`text_size_small text_color_hint text_weight_regular`}>
                        В наличии: {'8694'} шт.&nbsp;&nbsp;&nbsp;&nbsp; Мин. тираж: 150 шт.
                      </Typography>
                    </Box>
                  </Box>

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
                  setCartByAddingItem({ id: data.id, qty: quantity });
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
