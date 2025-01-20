import { useEffect, useCallback } from "react";
import styles from "./Filter.module.css";
import PriceSlider from "../PriceSlider/PriceSlider";
import { useState } from "react";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { filterProduct } from "../../shared/api";
import ReactDOM from 'react-dom';
import CustomCheckbox from "../../ui/checkbox/checkbox";
import ColorCircles from "../../ui/color-circles/color-circles";
import Dropdown from "../../ui/dropdown/dropdown";

const filterRoot = document.getElementById("filter");

function Filter({
  filterVisible,
  closeFilter
}) {
  const {
    offcetPrice,
    setLoader,
    setItems,
    setCount,
    setFilter,
    setFilterShow,
  } = useStore();
  // const [modal, setModal] = useState(true);
  const [brandActive, setbBrandActive] = useState([]);
  const [color, setColor] = useState(false);
  const [brand, setBrand] = useState(false);
  const [country, setCountry] = useState(false);
  // const [discount, setDiscount] = useState(false);
  const [key, setKey] = useState(0);

  const [check, setCheck] = useState(false);

  const brands = [
    {
      brand: "Brand Charger",
    },
    {
      brand: "Giulio Barсa",
    },
    {
      brand: "Lady Hamilton",
    },
    {
      brand: "FutbiTex",
    },
    {
      brand: "Zoom",
    },
    {
      brand: "Prodir",
    },
    {
      brand: "Thule",
    },
    {
      brand: "Wenger",
    },
    {
      brand: "Picooc",
    },
    {
      brand: "Case Logic",
    },
    {
      brand: "Joseph Joseph",
    },
    {
      brand: "Baseline®",
    },
    {
      brand: "Luxe",
    },
    {
      brand: "HIPER",
    },
    {
      brand: "Luigi Pesaresi",
    },
    {
      brand: "Vaggan",
    },
    {
      brand: "VICTORINOX",
    },
    {
      brand: "Tour de Grass",
    },
    {
      brand: "Grand Cuero",
    },
    {
      brand: "Elleven",
    },
    {
      brand: "Nina Ricci",
    },
    {
      brand: "Bruno Visconti",
    },
    {
      brand: "Vibe",
    },
    {
      brand: "Назад к истокам",
    },
    {
      brand: "Eat&Bite",
    },
    {
      brand: "Moleskine",
    },
    {
      brand: "Fossil",
    },
    {
      brand: "Elevate",
    },
    {
      brand: "MARZOTTO",
    },
    {
      brand: "Armani Exchange",
    },
    {
      brand: "Nadoba",
    },
    {
      brand: "Swarovski",
    },
    {
      brand: "Jean-Louis Scherrer",
    },
    {
      brand: "Eat&Bite Select",
    },
    {
      brand: "MONDIAL",
    },
    {
      brand: "Xoopar",
    },
    {
      brand: "roq",
    },
    {
      brand: "LAMY",
    },
    {
      brand: "Cerruti 1881",
    },
    {
      brand: "Relaxika",
    },
    {
      brand: "PRESENTREE",
    },
    {
      brand: "Waterline",
    },
    {
      brand: "Scripto",
    },
    {
      brand: "QDO",
    },
    {
      brand: "House of Inspiration",
    },
    {
      brand: "SWISSGEAR",
    },
    {
      brand: "Tekiō®",
    },
    {
      brand: "THERMOS",
    },
    {
      brand: "Pierre Cardin",
    },
    {
      brand: "Valerie Concept",
    },
    {
      brand: "REMEZair",
    },
    {
      brand: "Ambientair",
    },
    {
      brand: "Русские в моде",
    },
    {
      brand: "Альт",
    },
    {
      brand: "TORBER",
    },
    {
      brand: "FARE",
    },
    {
      brand: "Pigra",
    },
    {
      brand: "Kikkerland",
    },
    {
      brand: "Master of Wine",
    },
    {
      brand: "HUGO BOSS",
    },
    {
      brand: "Cross",
    },
    {
      brand: "OKTAUR",
    },
    {
      brand: "Field&CO",
    },
    {
      brand: "Travel Blue",
    },
    {
      brand: "ZIPPO",
    },
    {
      brand: "S.Babila",
    },
    {
      brand: "Ocean Bottle",
    },
    {
      brand: "Tranzip",
    },
    {
      brand: "Christian Lacroix",
    },
    {
      brand: "Riedel",
    },
    {
      brand: "Umbra",
    },
    {
      brand: "RESTO",
    },
    {
      brand: "Roly",
    },
    {
      brand: "Биван",
    },
    {
      brand: "Champ",
    },
    {
      brand: "Balmain",
    },
    {
      brand: "Piquadro",
    },
    {
      brand: "Versace",
    },
    {
      brand: "Slazenger",
    },
    {
      brand: "UMA",
    },
    {
      brand: "Союзмультфильм x Oasis",
    },
    {
      brand: "Lettertone",
    },
    {
      brand: "Ungaro",
    },
    {
      brand: "Authentic",
    },
    {
      brand: "Cepi",
    },
    {
      brand: "DKNY",
    },
    {
      brand: "MANO 1919",
    },
    {
      brand: "SCX.design",
    },
    {
      brand: "K'arst®",
    },
    {
      brand: "Asobu",
    },
    {
      brand: "Конфаэль",
    },
    {
      brand: "Авоська дарит надежду",
    },
    {
      brand: "Paradox",
    },
    {
      brand: "Varvara",
    },
    {
      brand: "Marksman",
    },
    {
      brand: "Alessandro Venanzi",
    },
    {
      brand: "Chinelli",
    },
    {
      brand: "Cacharel",
    },
    {
      brand: "VK",
    },
    {
      brand: "Arctic Zone",
    },
    {
      brand: "Xiaomi",
    },
    {
      brand: "Paul Bocuse",
    },
    {
      brand: "Profmagic",
    },
    {
      brand: "California Innovations",
    },
    {
      brand: "Evolt",
    },
    {
      brand: "Parker",
    },
    {
      brand: "Waterman",
    },
    {
      brand: "RIVACASE",
    },
    {
      brand: "Diplomat",
    },
    {
      brand: "US Basic",
    },
    {
      brand: "Green Concept",
    },
    {
      brand: "bobber",
    },
    {
      brand: "Duke",
    },
    {
      brand: "Voyager",
    },
    {
      brand: "Guess",
    },
    {
      brand: "Journalbooks",
    },
    {
      brand: "Monbento",
    },
    {
      brand: "Long River",
    },
    {
      brand: "KIANA",
    },
    {
      brand: "Zoku",
    },
    {
      brand: "Ogio",
    },
    {
      brand: "NINETYGO",
    },
    {
      brand: "Qjet",
    },
    {
      brand: "Rombica",
    },
    {
      brand: "Pulltex",
    },
    {
      brand: "Cesare Emiliano",
    },
    {
      brand: "Stac",
    },
    {
      brand: "CANYON",
    },
    {
      brand: "Laurens de Graff",
    },
    {
      brand: "Savio",
    },
    {
      brand: "William Lloyd",
    },
    {
      brand: "Ferre Milano",
    },
    {
      brand: "BUGATTI",
    },
    {
      brand: "Wellmark",
    },
    {
      brand: "Gumbite",
    },
    {
      brand: "Avenue",
    },
    {
      brand: "MIYO",
    },
    {
      brand: "STINGER",
    },
    {
      brand: "Linkie",
    },
    {
      brand: "Seasons",
    },
  ];
  const clothSizes = [
    { id: 1, value: 'XS' },
    { id: 2, value: 'S' },
    { id: 3, value: 'M' },
    { id: 4, value: 'L' },
    { id: 5, value: 'XL' }
  ];

  const ramSizes = [
    { id: 6, value: '4 Гб' },
    { id: 7, value: '8 Гб' },
    { id: 8, value: '12 Гб' },
    { id: 9, value: '16 Гб' },
    { id: 10, value: '32 Гб' },
    { id: 11, value: '64 Гб' },
    { id: 12, value: '128 Гб' },
    { id: 13, value: '256 Гб' },
    { id: 14, value: '512 Гб' }
  ];

  const batteryCapacities = [
    { id: 15, value: '2000 мАч' },
    { id: 16, value: '2200 мАч' },
    { id: 17, value: '2600 мАч' },
    { id: 18, value: '4000 мАч' },
    { id: 19, value: '5000 мАч' },
    { id: 20, value: '6000 мАч' },
    { id: 21, value: '7800 мАч' },
    { id: 22, value: '8000 мАч' },
    { id: 23, value: '9000 мАч' },
    { id: 24, value: '10000 мАч' },
    { id: 25, value: '20000 мАч' }
  ];

  const volumes = [
    { id: 26, value: '100 мл' },
    { id: 27, value: '150 мл' },
    { id: 28, value: '200 мл' },
    { id: 29, value: '250 мл' },
    { id: 30, value: '300 мл' },
    { id: 31, value: '400 мл' },
    { id: 32, value: '500 мл' },
    { id: 33, value: '600 мл' },
    { id: 34, value: '700 мл' },
    { id: 35, value: '800 мл' },
    { id: 36, value: '900 мл' },
    { id: 37, value: '1000 мл' },
    { id: 38, value: '2 л' },
    { id: 39, value: '4 л' }
  ];

  const paperSizes = [
    { id: 40, value: 'А2' },
    { id: 41, value: 'А3' },
    { id: 42, value: 'А4' }
  ];
  const sizes = [
    ...clothSizes,
    ...ramSizes,
    ...batteryCapacities,
    ...volumes,
    ...paperSizes
  ];

  const prints = [
    { id: 1111, value: "Вышивка" },
    { id: 1112, value: "Деколь" },
    { id: 1113, value: "Круговая гравировка" },
    { id: 1114, value: "Круговая УФ-печать" },
    { id: 1115, value: "Лазерная гравировка" },
    { id: 1116, value: "Металстикер" },
    { id: 1117, value: "Наклейка" },
    { id: 1118, value: "Наклейка под смолой" },
    { id: 1119, value: "Полноцвет водными чернилам" },
    { id: 1120, value: "Полноцвет с трансфером" },
    { id: 1121, value: "Сублимация" },
    { id: 1122, value: "Тампопечать" },
    { id: 1123, value: "Тиснение" },
    { id: 1124, value: "УФ-DTF-печать" },
    { id: 1125, value: "УФ-печать" },
    { id: 1126, value: "Флекс" },
    { id: 1127, value: "Цифровой офсет" },
    { id: 1128, value: "Шелкография" },
    { id: 1129, value: "Шильда" }
  ];
  const materials = [
    { id: 1130, value: "Soft Touch" },
    { id: 1131, value: "Переработанные материалы" },
    { id: 1132, value: "Акрил" },
    { id: 1133, value: "Алюминий" },
    { id: 1134, value: "Бумага" },
    { id: 1135, value: "Дерево" },
    { id: 1136, value: "Джут" },
    { id: 1137, value: "Искусственная кожа" },
    { id: 1138, value: "Пробка" },
    { id: 1139, value: "Камень" },
    { id: 1140, value: "Картон" },
    { id: 1141, value: "Керамика" },
    { id: 1142, value: "Латунь" },
    { id: 1143, value: "Лен" },
    { id: 1144, value: "МДФ" },
    { id: 1145, value: "Медь" },
    { id: 1146, value: "Металл" },
    { id: 1147, value: "Микрогофрокартон" },
    { id: 1148, value: "Микрофибра" },
    { id: 1149, value: "Натуральная кожа" },
    { id: 1150, value: "Нейлон" },
    { id: 1151, value: "Нержавеющая сталь" },
    { id: 1152, value: "ПВХ" },
    { id: 1153, value: "Пластик" },
    { id: 1154, value: "Поликарбонат" },
    { id: 1155, value: "Полиуретан" },
    { id: 1156, value: "Полиэстер" },
    { id: 1157, value: "Резина" },
    { id: 1158, value: "Силикон" },
    { id: 1159, value: "Стекло" },
    { id: 1160, value: "Фарфор" },
    { id: 1161, value: "Флис" },
    { id: 1162, value: "Хлопок" },
    { id: 1163, value: "Хлопок с Эластаном" },
    { id: 1164, value: "Хрусталь" }
]
  const toggleColorMenu = () => {
    setColor((prevColor) => !prevColor);
  };

  const toggleBrandMenu = () => {
    setBrand((prevBsetBrand) => !prevBsetBrand);
  };

  const toggleCountryMenu = () => {
    setCountry((prevCounsetCountry) => !prevCounsetCountry);
  };
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  //реализация скрытия окна фильтра по нажатия esc или вне области фильтра
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      closeFilter();
    }
  }, []);

  useEffect(() => {
    if (filterVisible) {
      document.addEventListener("keydown", escFunction);
    }
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [filterVisible]);

  return ReactDOM.createPortal((
    <div className={`${styles.filter__overlay} ${filterVisible && styles.filter__overlay_visibility_active}`}>
      <div key={key} className={styles.container} onMouseDown={closeFilter}>
        <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
          <div className={styles.modal__top}>
            <button
              className={styles.modal__btn_close}
              onClick={closeFilter}
            >
              <Icon id="#close" className={styles.close__icon} />
            </button>
            <h2 className={styles.modal__title}>Фильтр</h2>
          </div>
          <div className={styles.modal__list}>
            <li className={`${styles['modal__list-element']} ${styles['modal__list-element_padding_bid']}`} key={'Цена со скидкой'}>
              <CustomCheckbox label={'Цена со скидкой'} />
            </li>
            <li className={`${styles['modal__list-element']} ${styles['modal__list-element_padding_bid']}`} key={'ХИТ'}>
              <CustomCheckbox label={'ХИТ'} />
            </li>
            <li className={`${styles['modal__list-element']} ${styles['styles.modal__price_slider']} ${styles['modal__list-element_padding_bid']}`} key={'Наличие'}>
              <PriceSlider min={0} max={1000} symbol={'шт.'} />
            </li>
            <li className={`${styles['modal__list-element']} ${styles['styles.modal__price_slider']} ${styles['modal__list-element_padding_bid']}`} key={'Цена'}>
              <PriceSlider min={0} max={20000} symbol={'₽'} />
            </li>

            <li className={`${styles['modal__list-element']} ${styles['modal__list-element_padding_small']} ${styles['styles.modal__select']}`} key={'Цвет'}>
              <Dropdown text="Цвет" icon={
                <Icon
                  id="#arrowFilter"
                  className={styles.arrowFilter__icon}
                />
              } content={
                <ColorCircles />
              } />
            </li>
            <li className={`${styles['modal__list-element']} ${styles['modal__list-element_padding_small']} ${styles['styles.modal__select']}`} key={'Материал'}>
              <Dropdown text="Материал" icon={
                <Icon
                  id="#arrowFilter"
                  className={styles.arrowFilter__icon}
                />
              } content={
                materials && (
                  <ul className={styles.modal__select_list}>
                    {materials.map((data, i) => (
                      <li key={i} className={styles.modal_select_item}>
                        <h4 className={styles.modal__subtitle}>{data.value}</h4>
                        <input
                          className={styles.modal__checkbox}
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) => {
                            if (e.target.checked) {
                              setbBrandActive((prev) => {
                                return [...prev, data.value];
                              });
                            }
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              />
            </li>
            <li className={`${styles['modal__list-element']} ${styles['modal__list-element_padding_small']} ${styles['styles.modal__select']}`} key={'Метод нанесения'}>
              <Dropdown text="Метод нанесения" icon={
                <Icon
                  id="#arrowFilter"
                  className={styles.arrowFilter__icon}
                />
              } content={
                prints && (
                  <ul className={styles.modal__select_list}>
                    {prints.map((data, i) => (
                      <li key={i} className={styles.modal_select_item}>
                        <h4 className={styles.modal__subtitle}>{data.value}</h4>
                        <input
                          className={styles.modal__checkbox}
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) => {
                            if (e.target.checked) {
                              setbBrandActive((prev) => {
                                return [...prev, data.value];
                              });
                            }
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              />
            </li>
            <li className={`${styles['modal__list-element']} ${styles['modal__list-element_padding_small']} ${styles['styles.modal__select']}`} key={'Размер'}>
              <Dropdown text="Размер" icon={
                <Icon
                  id="#arrowFilter"
                  className={styles.arrowFilter__icon}
                />
              } content={
                sizes && (
                  <ul className={styles.modal__select_list}>
                    {sizes.map((data, i) => (
                      <li key={i} className={styles.modal_select_item}>
                        <h4 className={styles.modal__subtitle}>{data.value}</h4>
                        <input
                          className={styles.modal__checkbox}
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) => {
                            if (e.target.checked) {
                              setbBrandActive((prev) => {
                                return [...prev, value.brand];
                              });
                            }
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              />
            </li>
          </div>
          <div className={styles.modal__btns}>
            <button
              className={styles.modal__btn_reset}
              onClick={reloadComponent}
            >
              Сбросить
            </button>
            <button
              className={styles.modal__btn_save}
              onClick={() => {
                // if (discount) {
                //   setFilterShow(false);
                // } else {
                setFilterShow(false);
                setLoader(true);
                setFilter(true);
                filterProduct(
                  0,
                  10,
                  brandActive,
                  offcetPrice.start,
                  offcetPrice.end
                )
                  .then((res) => {
                    setItems(res.rows);
                    setCount(res.totalRows);
                  })
                  .finally(() => {
                    setLoader(false);
                  });
                // }
              }}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  ), filterRoot);
}

export default Filter;
