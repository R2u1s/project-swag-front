import { useEffect } from "react";
import styles from "./Filter.module.css";
import PriceSlider from "../PriceSlider/PriceSlider";
import { useState } from "react";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { filterProduct } from "../../shared/api";

function Filter() {
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

  return (
    <>
      {/* {modal && ( */}
      <div key={key} className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.modal__top}>
            <button
              className={styles.modal__btn_close}
              onClick={() => setFilterShow(false)}
            >
              <Icon id="#close" className={styles.close__icon} />
            </button>
            <h2 className={styles.modal__title}>Фильтр</h2>
          </div>
          <div className={styles.modal__content}>
            <div className={styles.modal__price}>
              <h4 className={styles.modal__subtitle}>Цена со скидкой</h4>
              <input
                className={styles.modal__checkbox}
                type="checkbox"
                name=""
                id=""
              />
            </div>
            <div className={styles.modal__price_slider}>
              <PriceSlider />
            </div>
            <div className={styles.modal__select}>
              <div
                className={styles.modal__select_top}
                onClick={toggleColorMenu}
              >
                <div className={styles.modal__subtitle}>Цвет</div>
                <button className={styles.modal__select_btn}>
                  <Icon
                    id="#arrowFilter"
                    className={styles.arrowFilter__icon}
                  />
                </button>
              </div>
              {color && (
                <ul className={styles.modal__select_list}>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>Мираторг</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>Fresh Secret</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>АмФуд</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>Свели</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>LavkaLavka</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>
                      Полезные продукты
                    </h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                </ul>
              )}
            </div>
            <div className={styles.modal__select}>
              <div
                className={styles.modal__select_top}
                onClick={toggleBrandMenu}
              >
                <div className={styles.modal__subtitle}>Бренд</div>
                <button className={styles.modal__select_btn}>
                  <Icon
                    id="#arrowFilter"
                    className={styles.arrowFilter__icon}
                  />
                </button>
              </div>
              {brand && (
                <ul className={styles.modal__select_list}>
                  {brands.map((data, i) => (
                    <li key={i} className={styles.modal_select_item}>
                      <h4 className={styles.modal__subtitle}>{data.brand}</h4>
                      <input
                        className={styles.modal__checkbox}
                        type="checkbox"
                        name=""
                        id=""
                        onChange={(e) => {
                          if (e.target.checked) {
                            setbBrandActive((prev) => {
                              return [...prev, data.brand];
                            });
                          }
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.modal__select}>
              <div
                className={styles.modal__select_top}
                onClick={toggleCountryMenu}
              >
                <div className={styles.modal__subtitle}>
                  Страна изготовитель
                </div>
                <button className={styles.modal__select_btn}>
                  <Icon
                    id="#arrowFilter"
                    className={styles.arrowFilter__icon}
                  />
                </button>
              </div>
              {country && (
                <ul className={styles.modal__select_list}>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>Мираторг</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>Fresh Secret</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>АмФуд</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>Свели</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>LavkaLavka</h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                  <li className={styles.modal_select_item}>
                    <h4 className={styles.modal__subtitle}>
                      Полезные продукты
                    </h4>
                    <input
                      className={styles.modal__checkbox}
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </li>
                </ul>
              )}
            </div>
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
      {/* )} */}
    </>
  );
}

export default Filter;
