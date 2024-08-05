import React from 'react'
import styles from './Contacts.module.css'
import Category from '../../components/Category/Category'
import Services from '../../components/Services/Services'

function Contacts() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.contacts}>
        <h1 className={styles.contacts__title}>Контактная информация</h1>
        <div className={styles.contacts__content}>
          <div className={styles.contacts__info}>
            <span className={styles.contacts__info_div}>
              <h5 className={styles.contacts__info_title}>Офис:</h5>
              <a className={styles.contacts__info_text} href="https://yandex.ru/maps/-/CDGGjEjv">117105, СПб, Варшавское ш., 25А стр. 6, офис 201е</a>
            </span>
            <span className={styles.contacts__info_span}>
              <h5 className={styles.contacts__info_title}>График работы:</h5>
              <p className={styles.contacts__info_text}>с 10:00 до 18:30 (Пн - Пт)</p>
            </span>
            <span className={styles.contacts__info_span}>
              <h5 className={styles.contacts__info_title}>Телефон:</h5>
              <a className={styles.contacts__info_text} href="tel:+8 (800) 775-80-46">8 (800) 775-80-46</a>
            </span>
            <span className={styles.contacts__info_span}>
              <h5 className={styles.contacts__info_title}>Почта:</h5>
              <a className={styles.contacts__info_link} href="mailto:info@swag.ru">info@swag.ru</a>
            </span>
          </div>
          <hr className={styles.contacts__hr}/>
          <div className={styles.contacts__text}>
            <p>Сложно определиться или вы хотите что-то особенное? Напишите нам - мы сделаем вам предложение, которое вам понравится.</p>
            <br />
            <p>С радостью ответим на все ваши вопросы.</p>
          </div>
        </div>
      </div>
      <div className={styles.map}>
        <iframe src="https://yandex.ru/map-widget/v1/?ll=30.341918%2C59.906867&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE1MjgwNBIr0KDQvtGB0YHQuNGPLCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsyIKDRSE8kEVNMFvQg%2C%2C&z=11.6" width="100%" height="400" frameborder="1" allowfullscreen="true"></iframe>
      </div>
      <div className={styles.services}>
        <Services/>
      </div>
      <div className={styles.category}>
        <Category/>
      </div>
    </div>
    </>
  )
}

export default Contacts