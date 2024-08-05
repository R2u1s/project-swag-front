import "./Home.css";
import styles from "./Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Services from "../../components/Services/Services";
import WelcomePack from "../../components/WelcomePack/WelcomePack";
import Category from "../../components/Category/Category";
import DesignSecondStep from "../../components/DesignSecondStep/DesignSecondStep";
import useStore from "../../shared/store";
import { getCatalog } from "../../shared/api";
import { useEffect } from "react";

function Home() {
  return (
    <>
      <div className={styles.container}>
        {/* <DesignSecondStep srcImage="/images/services_card1_shirt.png" /> */}
        <div className={styles.banner}>
          <Swiper
            pagination={{
              el: ".swiper-pagination-banner",
              type: "fraction",
            }}
            navigation={{
              prevEl: ".swiper-bannerBtn-prev",
              nextEl: ".swiper-bannerBtn-next",
            }}
            modules={[Pagination, Navigation]}
            className={styles.mySwiper}
          >
            <SwiperSlide className={styles.banner__slide1}>
              <img
                className={styles.banner__slide_logo}
                src="/images/logo.svg"
                alt=""
              />
              <div className={styles.banner__slide_info}>
                <div className={styles.banner__slider_items}>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img1.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img2.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img3.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img4.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img5.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img6.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img7.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img8.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img9.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img10.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img11.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img12.png"
                      alt=""
                    />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img
                      className={styles.banner__slide_img}
                      src="/images/img13.png"
                      alt=""
                    />
                  </div>
                </div>
                <h1 className={styles.banner__slide_title}>Всё сложится!</h1>
                <p className={styles.banner__slide_text}>
                  Выбирайте, персонализируйте и собирайте подарки в один клик.
                </p>
              </div>
              <button className={styles.banner__slide_btn}>
                Найти что нужно
              </button>
            </SwiperSlide>
            <SwiperSlide className={styles.banner__slide1}>
              <img
                className={styles.banner__slide_logo}
                src="/images/logo.svg"
                alt=""
              />
              <div className={styles.banner__slide_info}>
                <div className={styles.banner__slider_items}>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img1.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img2.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img3.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img4.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img5.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img6.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img7.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img8.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img9.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img10.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img11.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img12.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img13.png" alt="" />
                  </div>
                </div>
                <h1 className={styles.banner__slide_title}>Всё сложится!</h1>
                <p className={styles.banner__slide_text}>
                  Выбирайте, персонализируйте и собирайте подарки в один клик.
                </p>
              </div>
              <button className={styles.banner__slide_btn}>
                Найти что нужно
              </button>
            </SwiperSlide>
            <SwiperSlide className={styles.banner__slide1}>
              <img
                className={styles.banner__slide_logo}
                src="/images/logo.svg"
                alt=""
              />
              <div className={styles.banner__slide_info}>
                <div className={styles.banner__slider_items}>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img1.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img2.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img3.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img4.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img5.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img6.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img7.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img8.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img9.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img10.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img11.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img12.png" alt="" />
                  </div>
                  <div className={styles.banner__slider_item}>
                    <img src="/images/img13.png" alt="" />
                  </div>
                </div>
                <h1 className={styles.banner__slide_title}>Всё сложится!</h1>
                <p className={styles.banner__slide_text}>
                  Выбирайте, персонализируйте и собирайте подарки в один клик.
                </p>
              </div>
              <button className={styles.banner__slide_btn}>
                Найти что нужно
              </button>
            </SwiperSlide>
            <div className="swiper-pagination-banner"></div>
            <button className="swiper-bannerBtn-prev">
              <img src="/images/btn.svg" alt="" />
            </button>
            <button className="swiper-bannerBtn-next">
              <img src="/images/btn.svg" alt="" />
            </button>
          </Swiper>
        </div>
        <div className={styles.start}>
          <div className={styles.start__info}>
            <h2 className={styles.start__title}>Давайте начнем!</h2>
            <p className={styles.start__description}>
              Наборы мерча или отдельные товары?
            </p>
          </div>
          <div className={styles.start__content}>
            <div className={styles.start__card}>
              <div className={styles.start__card_info}>
                <h5 className={styles.start__card_title}>Наборы</h5>
                <p className={styles.start__card_desc}>
                  Собери уникальный наборили выбери готовое решение!
                </p>
                <button className={styles.start__card_btn}>Подробнее</button>
              </div>
              <img
                className={styles.start__card_img}
                src="/images/image_12_1.png"
                alt=""
              />
            </div>
            <div className={styles.start__card}>
              <div className={styles.start__card_info}>
                <h5 className={styles.start__card_title}>Каталог</h5>
                <p className={styles.start__card_desc}>
                  Огромный выбор отобранных вручную товаров!
                </p>
                <button className={styles.start__card_btn}>Подробнее</button>
              </div>
              <img
                className={styles.start__card_img2}
                src="/images/Group 5.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.category__info}>
            <h2 className={styles.category__title}>Корпоративные подарки</h2>
            <p className={styles.category__text}>
              Набирайте собственные наборы <br /> из отобранных товаров.
            </p>
          </div>
          <Category />
        </div>
        <div className={styles.welcomepack}>
          <WelcomePack />
        </div>
        <div className={styles.design}>
          <div className={styles.design__img}>
            <img
              className={styles.design__img1}
              src="/images/Group 12.png"
              alt=""
            />
            <img
              className={styles.design__img2}
              src="/images/Group 13.png"
              alt=""
            />
          </div>
          <div className={styles.design__advantages}>
            <button className={styles.design__advantages_btn}>Дизайн</button>
            <button className={styles.design__advantages_btn}>Качество</button>
            <button className={styles.design__advantages_btn}>Экономия</button>
            <button className={styles.design__advantages_btn}>
              Бесплатная презентация обазцов
            </button>
          </div>
          <div className={styles.design__info}>
            <p>Привезём образцы из шоурума или покажем их в режиме онлайн.</p>
            <br />
            <p>
              А также мы предлагаем вам посетить бесплатную презентацию образцов
              нашей продукции в уютном шоуруме.
            </p>
            <br />
            <strong>
              Мы уверены в качестве подарков и готовы продемонстрировать это
              вам.
            </strong>
          </div>
        </div>
        <div className={styles.services}>
          <Services />
        </div>
        <div className={styles.blog}>
          <div className={styles.blog__top}>
            <div className={styles.blog__info}>
              <h4 className={styles.blog__title}>Блог</h4>
              <p className={styles.blog__text}>
                Наборы мерча или отдельные товары?
              </p>
            </div>
            <button className={styles.blog__btn}>Все статьи</button>
          </div>
          <div className={styles.blog__content}>
            <div className={styles.blog__card}>
              <img
                className={styles.blog__card_img}
                src="/images/blog_card1.png"
                alt=""
              />
              <div className={styles.blog__card_content}>
                <h4 className={styles.blog__card_title}>
                  Как подобрать лучший подарок худшему сотруднику?
                </h4>
                <p className={styles.blog__card_desc}>
                  5 простых советов которые изменят вашу и жизнь ваших
                  сотрудников.
                </p>
              </div>
            </div>
            <div className={styles.blog__card}>
              <img
                className={styles.blog__card_img}
                src="/images/blog_card2.png"
                alt=""
              />
              <div className={styles.blog__card_content}>
                <h4 className={styles.blog__card_title}>Подарки к 8 марта</h4>
                <p className={styles.blog__card_desc}>
                  5 простых советов которые изменят вашу и жизнь ваших
                  сотрудников.
                </p>
              </div>
            </div>
            <div className={styles.blog__card}>
              <img
                className={styles.blog__card_img}
                src="/images/blog_card3.png"
                alt=""
              />
              <div className={styles.blog__card_content}>
                <h4 className={styles.blog__card_title}>
                  Корпоративные награды. Как повысить эффективность?
                </h4>
                <p className={styles.blog__card_desc}>
                  5 простых советов которые изменят вашу и жизнь ваших
                  сотрудников.
                </p>
              </div>
            </div>
            <div className={styles.blog__card}>
              <img
                className={styles.blog__card_img}
                src="/images/blog_card4.png"
                alt=""
              />
              <div className={styles.blog__card_content}>
                <h4 className={styles.blog__card_title}>
                  Новогодний набор 2024
                </h4>
                <p className={styles.blog__card_desc}></p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.support}>
          <div className={styles.support__decor}>
            <img
              className={styles.support__decor_img}
              src="/images/Clip path group.png"
              alt=""
            />
          </div>
          <div className={styles.support__content}>
            <div className={styles.support__info}>
              <h2 className={styles.support__title}>
                Звоните! <br />
                Сможем обсудить:
              </h2>
              <ul className={styles.support__list}>
                <li>что действительно в тренде и будет точно полезным</li>
                <li>как подобрать подарки под ваши задачи и бюджет</li>
                <li>как сэкономить и не потерять в качестве</li>
              </ul>
            </div>
            <form className={styles.support__form}>
              <input
                className={styles.support__form_input}
                type="text"
                name=""
                id=""
                placeholder="Название компании"
              />
              <input
                className={styles.support__form_input}
                type="text"
                name=""
                id=""
                placeholder="Email"
              />
              <div className={styles.support__form_bottom}>
                <div className={styles.support__form_policy}>
                  <span className={styles.support__form_span}>
                    <input
                      className={styles.support__form_checkbox}
                      type="checkbox"
                      name=""
                      id="checkbox"
                    />
                  </span>
                  <p>я даю согласие на обработку персональных данных</p>
                </div>
                <button className={styles.support__form_btn}>Отправить</button>
              </div>
            </form>
          </div>
          <div className={styles.support__decor}>
            <img
              className={styles.support__decor_img}
              src="/images/Clip path group2.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
