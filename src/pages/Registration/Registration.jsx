import React from 'react'
import Icon from '../../components/Icon/Index'
import styles from './Registration.module.css'
import { Link } from 'react-router-dom'
import OrderCard from '../../components/OrderCard/OrderCard'
import useStore from '../../shared/store'
import { useEffect, useState } from 'react'

function Registration() {
    const { cart, setCart } = useStore();
    const array = JSON.parse(localStorage.getItem("cart")) || [];

    useEffect(() => {
        setCart(array);
    }, []);

    const totalCost = cart.reduce((total, item) => total + (item.productCost * item.totalStock), 0).toFixed(2);

  return (
    <>
    <div className={styles.container}>
        <div className={styles.order}>
            <div className={styles.order__content}>
                <h1 className={styles.order__title} id={styles.order__title1}>Оформление заказа</h1>
                <form className={styles.order__form}>
                    <div className={styles.order__form_step}>
                        <h3 className={styles.order__form_title}>1. Контактная информация</h3>
                        <div className={styles.order__form_first}>
                            <input className={styles.order__form_input} type="text" placeholder='Имя *'/>
                            <input className={styles.order__form_input} type="text" placeholder='Фамилия *'/>
                            <input className={styles.order__form_input1} type="text" placeholder='Компания'/>
                            <input className={styles.order__form_input} type="text" placeholder='Email *'/>
                            <input className={styles.order__form_input} type="text" placeholder='Телефон'/>
                        </div>
                    </div>
                    <div className={styles.order__form_step}>
                        <h3 className={styles.order__form_title}>2. Доставка и упаковка</h3>
                        <div className={styles.order__form_second}>
                            <textarea className={styles.order__form_textarea} name="" id="" placeholder='Адрес доставки'></textarea>
                            <input className={styles.order__form_input} type="date" name="" id="" placeholder='Желаемая дата доставки'/>
                            <label className={styles.order__form_label}>
                            <input className={styles.order__form_checkbox} type="checkbox" name="" id="checkbox" />
                                Добавить сборку набора
                            </label>
                            <p className={styles.order__form_text}>Мы соберем и упакуем подарочный набор. К стоимости заказа будет добавлена 10% комиссия.</p>
                        </div>
                    </div>
                    <div className={styles.order__form_step}>
                        <h3 className={styles.order__form_title}>3. Оплата</h3>
                        <div className={styles.order__form_btns}>
                            <button className={styles.order__form_btn_pay}>Картой на сайте<Icon id="#card" className={styles.card__icon}/></button>
                            <button className={styles.order__form_btn_pay}>Оплата по счету<Icon id="#statement" className={styles.statement__icon}/></button>
                        </div>
                        <div className={styles.order__form_additionally}>
                            <input className={styles.order__form_input1} type="text" placeholder='Название* / Ф.И.О. ИП / ИНН / КПП'/>
                            <p className={styles.order__form_text}>Начните вводить, мы найдем информацию.</p>
                        </div>
                        <div className={styles.order__form_third}>
                            <textarea className={styles.order__form_textarea} name="" id="" placeholder='Комментарии'></textarea>
                        </div>
                        <p className={styles.order__form_text}>Мы соберем и упакуем подарочный набор. К стоимости заказа будет добавлена 10% комиссия.</p>
                    </div>
                    <button className={styles.order__form_btn}>Отправить заявку</button>
                </form>
            </div>
            <div className={styles.order__sidebar}>
                <div className={styles.order__sidebar_top}>
                    <h4 className={styles.order__sidebar_title}>Состав заказ</h4>
                    <Link to='/cart' className={styles.order__sidebar_btn}>Изменить</Link>
                </div>
                <div className={styles.order__sidebar_cards}>
                    {cart &&
                    cart.map((item, i) => {
                        return(
                            <OrderCard key={i} productName={item.productName} productCirculation={item.totalStock} srcImage={item.srcImage} price={item.productCost}/>
                        )
                    })
                    }
                </div>
                <div className={styles.order__sidebar_total}>
                    <span>Итого:</span>
                    <h5 className={styles.order__sidebar_cost}>{totalCost} ₽</h5>
                </div>
                <p className={styles.order__sidebar_warning}>
                    Цена указана без стоимости нанесения.
                </p>
            </div>
            <h1 className={styles.order__title} id={styles.order__title2}>Оформление заказа</h1>
        </div>
    </div>
    </>
  )
}

export default Registration