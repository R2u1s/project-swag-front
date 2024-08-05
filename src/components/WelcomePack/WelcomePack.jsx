import React from 'react'
import styles from './WelcomePack.module.css'

function WelcomePack() {
  return (
    <>
    <div className={styles.banner}>
        <div className={styles.banner__content}>
            <div className={styles.banner__info}>
                <h2 className={styles.banner__title}>Бесплатный Welcome pack</h2>
                <p className={styles.banner__text}>Получите бесплатный образец Welcome pack к себе в офис.</p>
            </div>
            <button className={styles.banner__btn}>Найти что нужно</button>
        </div>
    </div>
    </>
  )
}

export default WelcomePack