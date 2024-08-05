import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <footer className={styles.footer}>
        <Link to='/' className={styles.footer__logo}>
            <img className={styles.footer__logo_img} src="/images/logo1.svg" alt="" />
            <img className={styles.footer__logo_img2} src="/images/footer_img2.svg" alt="" />
        </Link>
        <div className={styles.footer__content}>
            <div className={styles.footer__sets} id={styles.footer__column_links}>
                <div className={styles.footer__title}>Наборы</div>
                <div className={styles.footer__links}>
                    <Link className={styles.footer__link}>Готовые наборы</Link>
                    <Link className={styles.footer__link}>Собрать набор</Link>
                    <Link className={styles.footer__link}>Наборы по событиям</Link>
                </div>
            </div>
            <div className={styles.footer__events} id={styles.footer__column_links}>
                <div className={styles.footer__title}>События</div>
                <div className={styles.footer__links}>
                    <Link className={styles.footer__link}>8 Марта</Link>
                    <Link className={styles.footer__link}>День Рождения</Link>
                    <Link className={styles.footer__link}>Новый год</Link>
                    <Link className={styles.footer__link}>Корпоративный праздник</Link>
                    <Link className={styles.footer__link}>Годовщина работы</Link>
                    <Link className={styles.footer__link}>Благодарность</Link>
                    <Link className={styles.footer__link}>Рождение ребенка</Link>
                    <Link className={styles.footer__link}>Адаптация сотрудника</Link>
                    <Link className={styles.footer__link}>Уход сотрудника</Link>
                </div>
            </div>
            <div className={styles.footer__catalog} id={styles.footer__column_links}>
                <div className={styles.footer__title}>Каталог</div>
                <div className={styles.footer__links}>
                    <Link to='/catalog' className={styles.footer__link}>Электроника</Link>
                    <Link to='/catalog' className={styles.footer__link}>Одежда</Link>
                    <Link to='/catalog' className={styles.footer__link}>Кружки</Link>
                    <Link to='/catalog' className={styles.footer__link}>Ежедневники</Link>
                </div>
            </div>
            <div className={styles.footer__services} id={styles.footer__column_links}>
                <div className={styles.footer__title}>Услуги</div>
                <div className={styles.footer__links}>
                    <Link className={styles.footer__link}>Дизайн-студия</Link>
                    <Link className={styles.footer__link}>Доставка и оплата</Link>
                    <Link className={styles.footer__link}>Подарочный сертификат</Link>
                    <Link className={styles.footer__link}>Обмен и возврат</Link>
                </div>
            </div>
            <div className={styles.footer__about} id={styles.footer__column_links}>
                <div className={styles.footer__title}>О нас</div>
                <div className={styles.footer__links}>
                    <Link to='/contacts' className={styles.footer__link}>Почему мы</Link>
                    <Link to='/contacts' className={styles.footer__link}>Контакты</Link>
                    <Link to='/contacts' className={styles.footer__link}>Документы</Link>
                </div>
            </div>
        </div>
        <div className={styles.footer__policy}>
            <div className={styles.footer__policy_content}>
                <span className={styles.footer__policy_span}>© 2024 SWAG <p>Политика конфиденциальности</p></span>
                <span>Разработка сайта</span>
            </div>
        </div>
        <div className={styles.footer__decor}>
            <img src="/images/decor.png" alt="" />
        </div>
    </footer>
    </>
  )
}

export default Footer