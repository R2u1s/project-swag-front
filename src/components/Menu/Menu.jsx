/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import styles from "./Menu.module.css";
import Icon from "../Icon/Index";
import useStore from "../../shared/store";
import { categoryCatalog, categoryCatalogCount } from "../../shared/api";
import { useNavigate } from "react-router-dom";

export const category = [
  {
    name: "Одежда",
    arr: [
      { name: "Топы и безрукавки" },
      { name: "Футболки" },
      { name: "Поло" },
      { name: "Спортивные костюмы" },
      { name: "Юбки" },
      {
        name: "Верхняя одежда",
        arr: [{ name: "Куртки" }, { name: "Ветровки" }, { name: "Дождевики" }],
      },
      { name: "Жилеты" },
      {
        name: "Головные уборы",
        arr: [
          { name: "Бейсболки и панамы" },
          { name: "Козырьки от солнца" },
          { name: "Повязки на голову" },
          { name: "Шляпы" },
          { name: "Шапки" },
          { name: "Обувь" },
          { name: "Носки" },
          { name: "Варежки и перчатки" },
          { name: "Шарфы" },
          { name: "Ремни" },
          { name: "Платки" },
          { name: "Профессиональная одежда" },
          { name: "Сигнальная одежда" },
          { name: "Рабочая одежда" },
        ],
      },
    ],
  },
  {
    name: "Сумки ",
    arr: [
      {
        name: "Сумки для документов",
      },
      {
        name: "Сумки для ноутбука",
        arr: [
          {
            name: "Чехлы для ноутбука",
          },
        ],
      },
      {
        name: "Сумки для спорта",
        arr: [
          {
            name: "Мешки",
          },
          {
            name: "Спортивные сумки",
          },
        ],
      },
      {
        name: "Для шопинга",
      },
      {
        name: "На пояс",
      },
      {
        name: "Пляжные сумки",
      },
      {
        name: "Портфели",
      },
      {
        name: "Рюкзаки",
      },
      {
        name: "Сумки-холодильники",
      },
      {
        name: "Несессеры",
      },
      {
        name: "Чемоданы",
      },
    ],
  },
  {
    name: "Аксессуары",
    arr: [
      {
        name: "Ремни",
      },
      {
        name: "Носки",
      },
      {
        name: "Галстуки",
      },
      {
        name: "Кошельки-накладки и картхолдеры для телефонов",
      },
      {
        name: "Обложки для паспорта",
      },
      {
        name: "Портмоне",
      },
      {
        name: "Солнцезащитные очки",
      },
      {
        name: "Часы наручные",
        arr: [
          { name: "Часы наручные мужские" },
          { name: "Часы наручные женские" },
        ],
      },
      {
        name: "Визитницы и ключницы",
      },
      {
        name: "Ремни",
      },
      {
        name: "Косметички",
      },
      {
        name: "Дорожные портмоне",
      },
      {
        name: "Платки",
      },
      {
        name: "Женские аксессуары",
      },
      {
        name: "Мужские наборы",
      },
    ],
  },
  {
    name: "Офис",
    arr: [
      {
        name: "Канцелярские товары",
        arr: [
          {
            name: "Канцелярские наборы",
          },
          {
            name: "Канцелярские ножи",
          },
          {
            name: "Линейки",
          },
          {
            name: "Пеналы",
          },
          {
            name: "Стикеры",
          },
          {
            name: "Точилки",
          },
        ],
      },
      {
        name: "Настольные аксессуары",
        arr: [
          {
            name: "Держатели для визиток",
          },
          {
            name: "Держатели для документов",
          },
          {
            name: "Календари",
          },
          {
            name: "Калькуляторы",
          },
          {
            name: "Лупы",
          },
          {
            name: "Настольные приборы",
          },
          {
            name: "Офисные подставки",
          },
          {
            name: "Погодные станции",
          },
        ],
      },
      {
        name: "Офисные наборы",
      },
      {
        name: "Папки",
        arr: [
          {
            name: "Папки для документов",
          },
          {
            name: "Папки с блокнотом",
          },
        ],
      },
      {
        name: "Часы",
        arr: [
          {
            name: "Настенные",
          },
          {
            name: "Настольные",
          },
        ],
      },
      {
        name: "Стикеры",
      },
    ],
  },
  {
    name: "Ежедневники и блокноты",
    arr: [
      {
        name: "Блокноты и записные книжки",
        arr: [
          {
            name: "Блокноты",
          },
          {
            name: "Записные книжки",
          },
          {
            name: "Наборы с блокнотом",
          },
        ],
      },
      {
        name: "Ежедневники",
        arr: [
          {
            name: "Датированные",
          },
          {
            name: "Коробки для ежедневников",
          },
          {
            name: "Недатированные",
          },
        ],
      },
    ],
  },
  {
    name: "Ручки и карандаши",
    arr: [
      {
        name: "Ручки",
        arr: [
          {
            name: "Металлические ручки",
          },
          {
            name: "Пластиковые ручки",
          },
          {
            name: "Оригинальные ручки",
          },
          {
            name: "Ручки-стилусы",
          },
          {
            name: "Наборы ручек",
          },
          {
            name: "Ручки из дерева и эко-материалов",
          },
          {
            name: "Упаковка для ручек",
          },
          {
            name: "Стержни и чернила",
          },
        ],
      },
      {
        name: "Карандаши",
      },
      {
        name: "Маркеры",
      },
      {
        name: "Наборы для рисования",
      },
    ],
  },
  {
    name: "Электроника",
    arr: [
      {
        name: "Внешние аккумуляторы",
      },
      {
        name: "Для мобильных устройств",
        arr: [
          {
            name: "Держатели и подставки для телефонов",
          },
          {
            name: "Кабели для мобильных телефонов",
          },
          {
            name: "Кошельки-накладки и картхолдеры для телефонов",
          },
          {
            name: "Очки виртуальной реальности",
          },
        ],
      },
      {
        name: "Беспроводные зарядные устройства, станции и лампы (БЗУ)",
      },
      {
        name: "Колонки и наушники",
      },
      {
        name: "Компьютерные аксессуары",
        arr: [
          {
            name: "USB-хабы",
          },
          {
            name: "Веб-камеры и лампы",
          },
          {
            name: "Коврики",
          },
          {
            name: "Мыши",
          },
          {
            name: "Подставки для ноутбуков",
          },
        ],
      },
      {
        name: "Наборы электроники",
      },
      {
        name: "Ноутбуки и планшеты",
      },
      {
        name: "Органайзеры",
      },
      {
        name: "Проекторы",
      },
      {
        name: "Бытовая техника",
        arr: [
          {
            name: "Пылесосы",
          },
          {
            name: "Увлажнители",
          },
          {
            name: "Вентиляторы",
          },
        ],
      },
      {
        name: "Сетевые адаптеры и розетки",
      },
      {
        name: "Умные гаджеты",
      },
      {
        name: "Устройства хранения",
        arr: [
          {
            name: "Упаковка для флешек",
          },
          {
            name: "Флешки",
          },
        ],
      },
      {
        name: "Веб-камеры и лампы",
      },
    ],
  },
  {
    name: "Дом",
    arr: [
      {
        name: "Декор",
        arr: [
          {
            name: "Ароматы для дома",
          },
          {
            name: "Ароматические свечи",
          },
          {
            name: "Вазы",
          },
          {
            name: "Растения",
          },
          {
            name: "Свечи и подсвечники",
          },
          {
            name: "Фигурки",
          },
        ],
      },
      {
        name: "Книги",
      },
    ],
  },
  {
    name: "Кухня и посуда",
    arr: [
      {
        name: "Аксессуары для алкоголя",
        arr: [
          {
            name: "Барные наборы",
          },
          {
            name: "Брелоки-открывалки",
          },
          {
            name: "Для алкоголя",
          },
          {
            name: "Открывалки",
          },
          {
            name: "Шейкеры",
          },
          {
            name: "Штофы",
          },
        ],
      },
      {
        name: "Аксессуары для вина",
        arr: [
          {
            name: "Аэраторы и декантеры",
          },
          {
            name: "Бокалы",
          },
          {
            name: "Наборы аксессуаров для вина",
          },
          {
            name: "Пробки для бутылок",
          },
          {
            name: "Тубусы для вина",
          },
          {
            name: "Холодильники для вина",
          },
          {
            name: "Чехлы для бутылок",
          },
          {
            name: "Штопоры",
          },
        ],
      },
      {
        name: "Аксессуары для кухни",
        arr: [
          {
            name: "Блендеры",
          },
          {
            name: "Ложки",
          },
          {
            name: "Мельницы для соли и перца",
          },
          {
            name: "Наборы кухонных принадлежностей",
          },
          {
            name: "Органайзеры для кухни",
          },
          {
            name: "Подставки для кухни",
          },
          {
            name: "Прихватки и щипцы",
          },
          {
            name: "Разделочные доски",
          },
          {
            name: "Рукавицы",
          },
          {
            name: "Термометры",
          },
          {
            name: "Фартуки",
          },
        ],
      },
      {
        name: "Аксессуары для чая и кофе",
        arr: [
          {
            name: "Кофейники",
          },
          {
            name: "Ситечки",
          },
          {
            name: "Чайники",
          },
          {
            name: "Чайные пары",
          },
          {
            name: "Наборы для кофе",
          },
          {
            name: "Наборы для чая",
          },
        ],
      },
      {
        name: "Бутылки для воды",
      },
      {
        name: "Контейнеры для еды",
      },
      {
        name: "Кружки и стаканы",
        arr: [
          {
            name: "Коробки для кружек",
          },
          {
            name: "Костеры",
          },
          {
            name: "Кружки",
          },
          {
            name: "Стаканы",
          },
        ],
      },
      {
        name: "Посуда",
        arr: [
          {
            name: "Блюда и подносы",
          },
          {
            name: "Бутылки для воды",
          },
          {
            name: "Графины",
          },
          {
            name: "Наборы столовых приборов",
          },
          {
            name: "Ножи и наборы ножей",
          },
          {
            name: "Подставки для бутылок",
          },
          {
            name: "Сервизы",
          },
          {
            name: "Сковороды",
          },
          {
            name: "Тарелки",
          },
        ],
      },
      {
        name: "Термокружки и термосы",
        arr: [
          {
            name: "Термокружки",
          },
          {
            name: "Термосы",
          },
          {
            name: "Наборы с термосом",
          },
        ],
      },
    ],
  },
  {
    name: "Отдых",
    arr: [
      {
        name: "Для отдыха на пляже",
        arr: [
          {
            name: "Пляжные коврики и циновки",
          },
          {
            name: "Пляжные мячи",
          },
          {
            name: "Пляжные сумки",
          },
          {
            name: "Сланцы",
          },
        ],
      },
      {
        name: "Для отдыха на природе",
        arr: [
          {
            name: "Вентиляторы карманные",
          },
          {
            name: "Гамаки",
          },
          {
            name: "Для рыбалки",
          },
          {
            name: "Коврики и циновки",
          },
          {
            name: "Наборы для пикника",
          },
          {
            name: "Надувные диваны",
          },
          {
            name: "Складные ножи",
          },
        ],
      },
      {
        name: "Для релаксации",
        arr: [
          {
            name: "Антистрессы",
          },
          {
            name: "Массажеры",
          },
        ],
      },
      {
        name: "Для спа и сауны",
        arr: [
          {
            name: "Полотенца",
          },
          {
            name: "Спа-наборы",
          },
          {
            name: "Товары для сауны",
          },
        ],
      },
      {
        name: "Для творчества и хобби",
        arr: [
          {
            name: "Азартные игры",
          },
          {
            name: "Головоломки",
          },
          {
            name: "Игры на воздухе",
          },
          {
            name: "Наборы для игры в карты",
          },
          {
            name: "Пляжные игры",
          },
        ],
      },
      {
        name: "Пледы",
      },
      {
        name: "Для путешествий",
        arr: [
          {
            name: "Наборы для путешествий",
          },
        ],
      },
    ],
  },
  {
    name: "Зонты",
    arr: [
      {
        name: "Зонты-трости",
      },
      {
        name: "Наборы с зонтами",
      },
      {
        name: "Складные зонты",
      },
    ],
  },
  {
    name: "Съедобные товары",
    arr: [
      {
        name: "Кофе и чай",
      },
      {
        name: "Мёд и варенье",
      },
      {
        name: "Продуктовые наборы",
      },
      {
        name: "Специи и приправы",
      },
    ],
  },
  {
    name: "Спорт",
    arr: [
      {
        name: "Наборы для спорта",
      },
      {
        name: "Спортивные аксессуары",
        arr: [
          {
            name: "Скакалки",
          },
          {
            name: "Шейкеры",
          },
          {
            name: "Секундомеры",
          },
          {
            name: "Мячи",
          },
          {
            name: "Напульсники",
          },
          {
            name: "Палки для ходьбы",
          },
          {
            name: "Аксессуары для фитнеса",
          },
        ],
      },
      {
        name: "Товары для болельщиков",
      },
      {
        name: "Товары для велосипедистов",
      },
      {
        name: "Массажеры",
      },
    ],
  },
  {
    name: "Товары для детей",
    arr: [
      {
        name: "Аксессуары для детей",
      },
      {
        name: "Одежда для детей",
      },
      {
        name: "Подарочные наборы детям",
      },
      {
        name: "Рюкзаки и сумки для детей",
      },
      {
        name: "Электроника для детей",
      },
    ],
  },
  {
    name: "Упаковка",
    arr: [
      {
        name: "Подарочные наборы",
      },
      {
        name: "Подарочные пакеты",
      },
      {
        name: "Наполнители для упаковки",
      },
      {
        name: "Подарочная упаковка",
        arr: [
          {
            name: "Из дерева",
          },
          {
            name: "Из картона",
          },
          {
            name: "Из кожи",
          },
          {
            name: "Из металла",
          },
          {
            name: "Из пластика",
          },
          {
            name: "Из текстиля",
          },
        ],
      },
      {
        name: "Для товаров",
        arr: [
          {
            name: "Для алкоголя",
          },
          {
            name: "Для блокнотов и ежедневников",
          },
          {
            name: "Для кружек",
          },
          {
            name: "Для ручек",
          },
          {
            name: "Для флешек",
          },
        ],
      },
    ],
  },
  {
    name: "Элементы кастомизации",
    arr: [
      {
        name: "Шильды",
      },
      {
        name: "Стикеры",
      },
    ],
  },
  {
    name: "Награды",
    arr: [
      {
        name: "Плакетки",
      },
      {
        name: "Медали",
      },
    ],
  },
];

function Menu() {
  const { setActiveCategory, setPage } = useStore();
  const [gar, setGar] = useState([]);
  const [garDown, setGarDown] = useState([]);

  const handleGarClick = (arr) => {
    setGar(arr);
    setGarDown([]);
  };
  const handleGarDownClick = (arr) => {
    if (arr) {
      setGarDown(arr);
    }
  };
  const { setItems, setLoader, setCount } = useStore();
  const redirect = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <h2 className={styles.menu__title}>Каталог</h2>
          <div className={styles.menu__content}>
            <div className={styles.menu__sidebar}>
              <div className={styles.menu__category}>
                {category.map((data, i) => (
                  <button
                    className={styles.menu__category_btn}
                    key={i}
                    onClick={() => handleGarClick(data.arr)}
                  >
                    {data.name}
                    <Icon id="#arrow" className={styles.arrow} />
                  </button>
                ))}
              </div>
              {gar.length > 0 && (
                <div className={styles.menu__items}>
                  {gar.map((data, i) => (
                    <button
                      className={styles.menu__category_btn}
                      key={i}
                      onClick={() => {
                        if (data.arr) {
                          setGarDown(data.arr);
                        } else {
                          setLoader(true);
                          categoryCatalog(data.name, 0, 11)
                            .then((data) => {
                              setItems(data);
                            })
                            .finally(() => {
                              setLoader(false);
                            });
                          categoryCatalogCount(data.name).then((data) => {
                            setCount(data[0].count);
                          });
                          setPage(1);
                          setActiveCategory(data.name);
                          redirect("/catalog");
                        }
                      }}
                    >
                      {data.name}
                      {data.arr && (
                        <Icon id="#arrow" className={styles.arrow} />
                      )}
                    </button>
                  ))}
                </div>
              )}
              {garDown.length > 0 && (
                <div className={styles.menu__items}>
                  {garDown.map((data, i) => (
                    <button
                      className={styles.menu__category_btn}
                      onClick={() => {
                        setLoader(true);
                        categoryCatalog(data.name, 0, 11)
                          .then((data) => {
                            setItems(data);
                          })
                          .finally(() => {
                            setLoader(false);
                          });
                        categoryCatalogCount(data.name).then((data) =>
                          setCount(data[0].count)
                        );
                        setActiveCategory(data.name);
                        redirect("/catalog");
                        setPage(1);
                      }}
                      key={i}
                    >
                      {data.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.menu__banner}>
              <div className={styles.menu__banner_info}>
                <h3 className={styles.menu__banner_title}>
                  Бесплатный Welcome pack
                </h3>
                <p className={styles.menu__banner_text}>
                  Получите бесплатный образец Welcome pack к себе в офис.
                </p>
              </div>
              <button className={styles.menu__banner_btn}>Заказать</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
